"use client";

import { useEffect, useState } from "react";

import { Property } from "@/types/property";

interface PropertyWorkspaceProps {
  property: Property;

  saveProperty: (
    property: Property
  ) => Promise<void>;

  addProperty: (
    property: Omit<
      Property,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeProperty: (
    id: string
  ) => Promise<void>;
}

export default function PropertyWorkspace({
  property,
  saveProperty,
  addProperty,
  removeProperty,
}: PropertyWorkspaceProps) {

  const [editedProperty, setEditedProperty] =
    useState<Property>(property);

  useEffect(() => {
    setEditedProperty(property);
  }, [property]);

  function updateField<
    K extends keyof Property
  >(
    field: K,
    value: Property[K]
  ) {
    setEditedProperty((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const isNewProperty =
    editedProperty.id === "";

  return (

    <div className="flex-1 overflow-y-auto">

      <div className="max-w-6xl mx-auto p-8">

        {/* ====================================================== */}
        {/* Header */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">

                {isNewProperty
                  ? "New Property"
                  : editedProperty.property_name}

              </h1>

              <p className="mt-2 text-slate-500">

                Property #
                {editedProperty.property_number || "New"}

              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                editedProperty.is_active
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {editedProperty.is_active
                ? "Active"
                : "Inactive"}
            </span>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Property Details */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">

            Property Details

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Property Number */}

            <div>

              <label className="block text-sm font-semibold mb-2">

                Property Number

              </label>

              <input
                type="number"
                value={
                  editedProperty.property_number
                }
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3"
              />

            </div>

            {/* Customer ID */}

            <div>

              <label className="block text-sm font-semibold mb-2">

                Customer ID

              </label>

              <input
                value={
                  editedProperty.customer_id
                }
                onChange={(e) =>
                  updateField(
                    "customer_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Property Name */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-2">

                Property Name

              </label>

              <input
                value={
                  editedProperty.property_name
                }
                onChange={(e) =>
                  updateField(
                    "property_name",
                    e.target.value
                  )
                }
                placeholder="e.g. Home, Factory, Holiday House"
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Address */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Property Address
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Address Line 1 */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-2">
                Address Line 1
              </label>

              <input
                value={editedProperty.address_line_1}
                onChange={(e) =>
                  updateField(
                    "address_line_1",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Address Line 2 */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-2">
                Address Line 2
              </label>

              <input
                value={
                  editedProperty.address_line_2 ?? ""
                }
                onChange={(e) =>
                  updateField(
                    "address_line_2",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Suburb */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Suburb
              </label>

              <input
                value={editedProperty.suburb}
                onChange={(e) =>
                  updateField(
                    "suburb",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* State */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                State
              </label>

              <input
                value={editedProperty.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Postcode */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Postcode
              </label>

              <input
                value={editedProperty.postcode}
                onChange={(e) =>
                  updateField(
                    "postcode",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* GPS Coordinates */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold">
                GPS Coordinates
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Optional coordinates for mapping and route optimisation.
              </p>

            </div>

            <button
              type="button"
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200 transition"
            >
              📍 Locate on Map
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Latitude */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                value={editedProperty.latitude ?? ""}
                onChange={(e) =>
                  updateField(
                    "latitude",
                    e.target.value === ""
                      ? null
                      : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Longitude */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                value={editedProperty.longitude ?? ""}
                onChange={(e) =>
                  updateField(
                    "longitude",
                    e.target.value === ""
                      ? null
                      : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

          {/* Future Map Placeholder */}

          <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10">

            <div className="text-center">

              <div className="text-5xl mb-4">
                🗺️
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                Interactive Property Map
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Google Maps or Mapbox integration will display the property
                location here in a future release.
              </p>

            </div>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Site Access */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Site Access
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Gate Code */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Gate Code
              </label>

              <input
                value={editedProperty.gate_code ?? ""}
                onChange={(e) =>
                  updateField(
                    "gate_code",
                    e.target.value
                  )
                }
                placeholder="Gate code"
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Alarm Code */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Alarm Code
              </label>

              <input
                value={editedProperty.alarm_code ?? ""}
                onChange={(e) =>
                  updateField(
                    "alarm_code",
                    e.target.value
                  )
                }
                placeholder="Alarm code"
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

          {/* Access Notes */}

          <div className="mt-6">

            <label className="block text-sm font-semibold mb-2">
              Access Notes
            </label>

            <textarea
              rows={5}
              value={
                editedProperty.access_notes ?? ""
              }
              onChange={(e) =>
                updateField(
                  "access_notes",
                  e.target.value
                )
              }
              placeholder="Describe how technicians access the property..."
              className="w-full rounded-lg border px-4 py-3 resize-none"
            />

          </div>

        </div>

        {/* ====================================================== */}
        {/* Property Notes */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Property Notes
          </h2>

          <textarea
            rows={8}
            value={
              editedProperty.property_notes ?? ""
            }
            onChange={(e) =>
              updateField(
                "property_notes",
                e.target.value
              )
            }
            placeholder="General notes about this property..."
            className="w-full rounded-lg border px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================================== */}
        {/* Future Modules */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Property Hub
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <button
              type="button"
              className="rounded-xl border p-6 hover:bg-slate-50 transition text-left"
            >
              <div className="text-3xl mb-3">
                📝
              </div>

              <h3 className="font-semibold">
                Quotes
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                View all quotes for this property.
              </p>

            </button>

            <button
              type="button"
              className="rounded-xl border p-6 hover:bg-slate-50 transition text-left"
            >
              <div className="text-3xl mb-3">
                📅
              </div>

              <h3 className="font-semibold">
                Jobs
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Scheduled and completed work.
              </p>

            </button>

            <button
              type="button"
              className="rounded-xl border p-6 hover:bg-slate-50 transition text-left"
            >
              <div className="text-3xl mb-3">
                📷
              </div>

              <h3 className="font-semibold">
                Photos
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Site photographs and inspections.
              </p>

            </button>

            <button
              type="button"
              className="rounded-xl border p-6 hover:bg-slate-50 transition text-left"
            >
              <div className="text-3xl mb-3">
                📁
              </div>

              <h3 className="font-semibold">
                Documents
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Manuals, plans and certificates.
              </p>

            </button>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Actions */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <label className="text-sm font-semibold text-slate-700">
                Active Property
              </label>

              <input
                type="checkbox"
                checked={editedProperty.is_active}
                onChange={(e) =>
                  updateField(
                    "is_active",
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded"
              />

            </div>

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
                onClick={async () => {

                  try {

                    if (isNewProperty) {

                      const {
                        id,
                        created_at,
                        updated_at,
                        ...newProperty
                      } = editedProperty;

                      await addProperty(
                        newProperty
                      );

                      alert(
                        "✅ Property created successfully."
                      );

                    } else {

                      await saveProperty(
                        editedProperty
                      );

                      alert(
                        "✅ Property saved successfully."
                      );

                    }

                  } catch (err) {

                    console.error(err);

                    alert(
                      "Unable to save property."
                    );

                  }

                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                💾 Save Property
              </button>

              {/* Duplicate */}

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📄 Duplicate
              </button>

              {/* View Customer */}

              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                👤 View Customer
              </button>

              {/* Delete */}

              {!isNewProperty && (

                <button
                  onClick={async () => {

                    if (
                      !confirm(
                        `Delete "${editedProperty.property_name}"?`
                      )
                    ) {
                      return;
                    }

                    try {

                      await removeProperty(
                        editedProperty.id
                      );

                      alert(
                        "Property deleted."
                      );

                    } catch (err) {

                      console.error(err);

                      alert(
                        "Unable to delete property."
                      );

                    }

                  }}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑 Delete
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}