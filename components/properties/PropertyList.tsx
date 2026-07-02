"use client";

import { useMemo, useState } from "react";

import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
}

export default function PropertyList({
  properties,
  selectedProperty,
  onSelectProperty,
}: PropertyListProps) {
  const [search, setSearch] = useState("");

  const filteredProperties = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return properties;

    return properties.filter((property) => {
      return (
        property.property_name
          .toLowerCase()
          .includes(text) ||

        property.address_line_1
          .toLowerCase()
          .includes(text) ||

        (property.address_line_2 ?? "")
          .toLowerCase()
          .includes(text) ||

        property.suburb
          .toLowerCase()
          .includes(text) ||

        property.state
          .toLowerCase()
          .includes(text) ||

        property.postcode
          .toLowerCase()
          .includes(text) ||

        (property.property_notes ?? "")
          .toLowerCase()
          .includes(text)
      );
    });
  }, [properties, search]);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Properties
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredProperties.length} of {properties.length} properties
        </p>

        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* Property Cards */}

      <div className="flex-1 overflow-y-auto p-4">

        {filteredProperties.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                🏡
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Properties Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term.
              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredProperties.map((property) => (

              <PropertyCard
                key={property.id}
                property={property}
                selected={
                  selectedProperty?.id === property.id
                }
                onClick={() =>
                  onSelectProperty(property)
                }
              />

            ))}

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            {filteredProperties.length} displayed
          </span>

          <span className="text-sm font-medium text-slate-600">
            Total: {properties.length}
          </span>

        </div>

      </div>

    </div>
  );
}