"use client";

import { Quote } from "@/types/quote";

interface QuoteCardProps {
  quote: Quote;
  selected?: boolean;
  onClick?: () => void;
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Draft":
      return "bg-amber-100 text-amber-700";

    case "Sent":
      return "bg-blue-100 text-blue-700";

    case "Accepted":
      return "bg-emerald-100 text-emerald-700";

    case "Declined":
      return "bg-red-100 text-red-700";

    case "Expired":
      return "bg-slate-200 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function QuoteCard({
  quote,
  selected = false,
  onClick,
}: QuoteCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-5
        text-left
        transition-all
        duration-200

        ${
          selected
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
        }
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-800">
            Quote #{quote.quote_number}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Version {quote.version}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
            quote.quote_status
          )}`}
        >
          {quote.quote_status}
        </span>

      </div>

      {/* Related Records */}

      <div className="mt-5 space-y-2 text-sm text-slate-600">

        <div className="flex items-center gap-2">
          <span>👤</span>
          <span>
            Customer:{" "}
            {quote.customer_id || "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>🏡</span>
          <span>
            Property:{" "}
            {quote.property_id || "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>💼</span>
          <span>
            Opportunity:{" "}
            {quote.opportunity_id || "-"}
          </span>
        </div>

      </div>

      {/* Totals */}

      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <div className="flex justify-between text-sm">

          <span className="text-slate-500">
            Materials
          </span>

          <span className="font-medium">
            $
            {quote.materials_total.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        <div className="mt-2 flex justify-between text-sm">

          <span className="text-slate-500">
            Labour
          </span>

          <span className="font-medium">
            $
            {quote.labour_total.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        <div className="mt-3 border-t border-slate-200 pt-3 flex justify-between">

          <span className="font-semibold">
            Total
          </span>

          <span className="text-xl font-bold text-emerald-600">
            $
            {quote.total.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </span>

        </div>

      </div>

      {/* Dates */}

      <div className="mt-5 flex justify-between text-sm text-slate-500">

        <div>

          <div className="font-medium text-slate-700">
            Issued
          </div>

          <div>
            {quote.issue_date}
          </div>

        </div>

        <div className="text-right">

          <div className="font-medium text-slate-700">
            Expires
          </div>

          <div>
            {quote.expiry_date}
          </div>

        </div>

      </div>

    </button>
  );
}