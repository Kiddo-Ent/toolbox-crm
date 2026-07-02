"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { Property } from "@/types/property";
import { useProperties } from "@/hooks/useProperties";

import PropertyList from "./PropertyList";
import PropertyWorkspace from "./PropertyWorkspace";

export default function PropertyDashboard() {
  const {
    properties,
    loading,
    error,
    saveProperty,
    addProperty,
    removeProperty,
  } = useProperties();

  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  useEffect(() => {
    if (
      properties.length > 0 &&
      selectedProperty === null
    ) {
      setSelectedProperty(properties[0]);
    }
  }, [properties, selectedProperty]);

  function createNewProperty() {
    const newProperty: Property = {
      id: "",

      customer_id: "",

      property_name: "",

      address_line_1: "",
      address_line_2: "",

      suburb: "",
      state: "",
      postcode: "",

      property_type: "Residential",

      access_notes: "",
      gate_code: "",
      alarm_code: "",

      latitude: null,
      longitude: null,

      notes: "",

      is_active: true,

      is_deleted: false,
      deleted_at: null,

      created_at: "",
      updated_at: "",
    };

    setSelectedProperty(newProperty);
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Properties
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customer properties, addresses and site information.
          </p>

        </div>

        <button
          onClick={createNewProperty}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + New Property
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white p-12 text-center shadow">

          <h2 className="text-xl font-semibold text-slate-700">
            Loading properties...
          </h2>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">

          {error}

        </div>

      )}

      {/* Main Layout */}

      {!loading && !error && (

        <div className="grid h-[calc(100vh-240px)] grid-cols-12 gap-6">

          {/* Left */}

          <div className="col-span-4">

            <PropertyList
              properties={properties}
              selectedProperty={selectedProperty}
              onSelectProperty={setSelectedProperty}
            />

          </div>

          {/* Right */}

          <div className="col-span-8">

            {selectedProperty ? (

              <PropertyWorkspace
                property={selectedProperty}
                saveProperty={saveProperty}
                addProperty={addProperty}
                removeProperty={removeProperty}
              />

            ) : (

              <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow">

                <div className="text-center">

                  <h2 className="text-2xl font-bold text-slate-700">
                    No Property Selected
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Select a property from the list or create a new one.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}