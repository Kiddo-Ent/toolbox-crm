"use client";

import { Property } from "@/types/property";

interface PropertySummaryCardProps {
  property: Property | null;
}

export default function PropertySummaryCard({
  property,
}: PropertySummaryCardProps) {
  if (!property) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          🏠 Property
        </h2>

        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 text-center text-slate-500">
          No property selected.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            🏠 Property
          </h2>

          <p className="text-sm text-slate-500">
            Work Location
          </p>

        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow">
          #{property.property_number}
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="md:col-span-2">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Property Name
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-800">
            {property.property_name}
          </p>

        </div>

        <div className="md:col-span-2">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Address
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {property.address_line_1}
          </p>

          {property.address_line_2 && (
            <p className="font-medium text-slate-700">
              {property.address_line_2}
            </p>
          )}

          <p className="font-medium text-slate-700">
            {property.suburb}, {property.state} {property.postcode}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Access Notes
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {property.access_notes || "None"}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              property.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {property.is_active ? "Active" : "Inactive"}
          </span>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Gate Code
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {property.gate_code || "Not recorded"}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Alarm Code
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {property.alarm_code || "Not recorded"}
          </p>

        </div>

        {property.property_notes && (

          <div className="md:col-span-2">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Property Notes
            </p>

            <div className="mt-2 rounded-xl bg-white p-4 text-slate-700 shadow-inner whitespace-pre-wrap">
              {property.property_notes}
            </div>

          </div>

        )}

      </div>

    </div>
  );
}