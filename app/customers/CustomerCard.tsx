"use client";

import { Customer } from "@/types/customer";

interface CustomerCardProps {
  customer: Customer;
  selected?: boolean;
  onClick?: () => void;
}

export default function CustomerCard({
  customer,
  selected = false,
  onClick,
}: CustomerCardProps) {
  const fullName =
    `${customer.first_name} ${customer.last_name}`.trim();

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        border
        p-5
        text-left
        transition-all
        duration-200

        ${
          selected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start justify-between">

        {/* Left */}

        <div className="flex items-start gap-4">

          {/* Avatar */}

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">

            {customer.first_name.charAt(0).toUpperCase()}
            {customer.last_name.charAt(0).toUpperCase()}

          </div>

          {/* Details */}

          <div>

            <h3 className="text-lg font-semibold text-slate-800">
              {fullName || "New Customer"}
            </h3>

            {customer.company_name && (
              <p className="mt-1 text-sm text-slate-600">
                {customer.company_name}
              </p>
            )}

            <div className="mt-3 space-y-1 text-sm text-slate-500">

              {customer.mobile_phone && (
                <p>
                  📱 {customer.mobile_phone}
                </p>
              )}

              {customer.email && (
                <p>
                  ✉️ {customer.email}
                </p>
              )}

              {customer.suburb && (
                <p>
                  📍 {customer.suburb}
                  {customer.state
                    ? `, ${customer.state}`
                    : ""}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="flex flex-col items-end gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              customer.is_active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {customer.is_active
              ? "Active"
              : "Inactive"}
          </span>

          <span className="text-xs text-slate-400">
            #{customer.customer_number}
          </span>

        </div>

      </div>
    </button>
  );
}