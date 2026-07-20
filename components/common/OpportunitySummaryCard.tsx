"use client";

import { Opportunity } from "@/types/opportunity";

interface OpportunitySummaryCardProps {
  opportunity: Opportunity | null;
}

export default function OpportunitySummaryCard({
  opportunity,
}: OpportunitySummaryCardProps) {
  if (!opportunity) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          📋 Opportunity
        </h2>

        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 text-center text-slate-500">
          No opportunity linked.
        </div>
      </div>
    );
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "Won":
        return "bg-green-100 text-green-700";

      case "Quoted":
        return "bg-blue-100 text-blue-700";

      case "Site Visit Booked":
        return "bg-amber-100 text-amber-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            📋 Opportunity
          </h2>

          <p className="text-sm text-slate-500">
            Opportunity Summary
          </p>

        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow">
          Opportunity #{opportunity.opportunity_number}
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Title
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-800">
            {opportunity.title}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(
              opportunity.opportunity_status
            )}`}
          >
            {opportunity.opportunity_status}
          </span>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Source
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {opportunity.source}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estimated Value
          </p>

          <p className="mt-1 text-lg font-bold text-green-600">
            $
            {(opportunity.estimated_value ?? 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Expected Start
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {opportunity.expected_start_date || "Not Scheduled"}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Probability
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {opportunity.probability}%
          </p>

        </div>

        <div className="md:col-span-2">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Customer Request
          </p>

          <div className="mt-2 rounded-xl bg-white p-4 shadow-inner whitespace-pre-wrap text-slate-700">
            {opportunity.description || "No description provided."}
          </div>

        </div>

        {opportunity.notes && (

          <div className="md:col-span-2">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Internal Notes
            </p>

            <div className="mt-2 rounded-xl bg-yellow-50 border border-yellow-200 p-4 whitespace-pre-wrap text-slate-700">
              {opportunity.notes}
            </div>

          </div>

        )}

      </div>

    </div>
  );
}