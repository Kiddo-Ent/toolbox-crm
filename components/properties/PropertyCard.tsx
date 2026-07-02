"use client";

import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  selected?: boolean;
  onClick?: () => void;
}

export default function PropertyCard({
  property,
  selected = false,
  onClick,
}: PropertyCardProps) {
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

          {/* Icon */}

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">
            🏡
          </div>

          {/* Details */}

          <div>

            <h3 className="text-lg font-semibold text-slate-800">
              {property.property_name || "New Property"}
            </h3>

            {property.address_line_1 && (
              <p className="mt-1 text-sm text-slate-600">
                {property.address_line_1}
              </p>
            )}

            <div className="mt-3 space-y-1 text-sm text-slate-500">

              {property.suburb && (
                <p>
                  📍 {property.suburb}
                  {property.state
                    ? `, ${property.state}`
                    : ""}
                </p>
              )}

              {property.postcode && (
                <p>
                  {property.postcode}
                </p>
              )}

              {property.property_type && (
                <p>
                  🏷 {property.property_type}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="flex flex-col items-end gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              property.is_active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {property.is_active
              ? "Active"
              : "Inactive"}
          </span>

        </div>

      </div>
    </button>
  );
}