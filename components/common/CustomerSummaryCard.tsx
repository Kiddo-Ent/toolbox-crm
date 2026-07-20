"use client";

import { Customer } from "@/types/customer";

interface CustomerSummaryCardProps {
  customer: Customer | null;
}

export default function CustomerSummaryCard({
  customer,
}: CustomerSummaryCardProps) {
  if (!customer) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          👤 Customer
        </h2>

        <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-8 text-center text-slate-500">
          No customer selected.
        </div>
      </div>
    );
  }

  const fullName = `${customer.first_name} ${customer.last_name}`.trim();

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            👤 Customer
          </h2>

          <p className="text-sm text-slate-500">
            Customer information
          </p>

        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow">
          #{customer.customer_number}
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Full Name
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-800">
            {fullName}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Mobile
          </p>

          <p className="mt-1 font-medium text-slate-700">
            {customer.mobile_phone || "—"}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email
          </p>

          <p className="mt-1 break-all font-medium text-slate-700">
            {customer.email || "—"}
          </p>

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              customer.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.is_active ? "Active" : "Inactive"}
          </span>

        </div>

        <div className="md:col-span-2">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Postal Address
          </p>

          <p className="mt-1 whitespace-pre-line font-medium text-slate-700">
            {[
              customer.address_line_1,
              customer.address_line_2,
              customer.suburb,
              customer.state,
              customer.postcode,
            ]
              .filter(Boolean)
              .join(", ") || "No address recorded"}
          </p>

        </div>

        {customer.notes && (

          <div className="md:col-span-2">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Notes
            </p>

            <div className="mt-2 rounded-xl bg-white p-4 text-slate-700 shadow-inner">
              {customer.notes}
            </div>

          </div>

        )}

      </div>

    </div>
  );
}