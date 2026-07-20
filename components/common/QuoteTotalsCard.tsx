"use client";

import { Quote } from "@/types/quote";

interface QuoteTotalsCardProps {
  quote: Quote;
}

function currency(value: number | null | undefined) {
  return `$${(value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function QuoteTotalsCard({
  quote,
}: QuoteTotalsCardProps) {
  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 shadow-sm">

      <div className="border-b border-green-200 px-6 py-4">

        <h2 className="text-xl font-bold text-slate-800">
          💰 Quote Totals
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Pricing summary for this quote.
        </p>

      </div>

      <div className="p-6">

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-slate-600">
              Materials
            </span>

            <span className="font-semibold">
              {currency(quote.materials_total)}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-600">
              Labour
            </span>

            <span className="font-semibold">
              {currency(quote.labour_total)}
            </span>

          </div>

          <hr />

          <div className="flex items-center justify-between text-lg">

            <span className="font-semibold">
              Subtotal
            </span>

            <span className="font-bold">
              {currency(quote.subtotal)}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-600">
              GST (10%)
            </span>

            <span className="font-semibold">
              {currency(quote.gst)}
            </span>

          </div>

          <hr />

          <div className="rounded-xl bg-green-600 px-6 py-5 text-white">

            <div className="flex items-center justify-between">

              <span className="text-xl font-bold">
                TOTAL
              </span>

              <span className="text-3xl font-bold">
                {currency(quote.total)}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}