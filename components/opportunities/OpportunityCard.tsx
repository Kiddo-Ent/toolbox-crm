"use client";

import { Opportunity } from "@/types/opportunity";

interface OpportunityCardProps {
  opportunity: Opportunity;
  selected?: boolean;
  onClick?: () => void;
}

export default function OpportunityCard({
  opportunity,
  selected = false,
  onClick,
}: OpportunityCardProps) {
  function statusStyles(status: string) {
    switch (status) {
      case "Lead":
        return "bg-slate-100 text-slate-700";

      case "Site Visit":
        return "bg-blue-100 text-blue-700";

      case "Quoting":
        return "bg-amber-100 text-amber-700";

      case "Quote Sent":
        return "bg-indigo-100 text-indigo-700";

      case "Negotiating":
        return "bg-purple-100 text-purple-700";

      case "Won":
        return "bg-emerald-100 text-emerald-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

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
            {opportunity.title || "New Opportunity"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Opportunity #{opportunity.opportunity_number}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
            opportunity.status
          )}`}
        >
          {opportunity.status}
        </span>

      </div>

      {/* Customer & Property */}

      <div className="mt-5 space-y-2 text-sm text-slate-600">

        <div className="flex items-center gap-2">
          <span>👤</span>

          <span>
            Customer ID:{" "}
            {opportunity.customer_id || "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>🏡</span>

          <span>
            Property ID:{" "}
            {opportunity.property_id || "-"}
          </span>
        </div>

      </div>

      {/* Description */}

      {opportunity.description && (

        <p className="mt-4 line-clamp-2 text-sm text-slate-500">

          {opportunity.description}

        </p>

      )}

      {/* Footer */}

      <div className="mt-6 border-t border-slate-200 pt-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Estimated Value
            </p>

            <p className="text-xl font-bold text-emerald-600">
              $
              {opportunity.estimated_value.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Close Date
            </p>

            <p className="text-sm font-medium text-slate-700">
              {opportunity.expected_close_date ??
                "Not Set"}
            </p>

          </div>

        </div>

      </div>

    </button>
  );
}