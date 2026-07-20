"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Opportunity } from "@/types/opportunity";
import PhotoGallery from "@/components/photos/PhotoGallery";
import Modal from "@/components/ui/Modal";

interface OpportunityWorkspaceProps {
  opportunity: Opportunity;

  saveOpportunity: (
    opportunity: Opportunity
  ) => Promise<void>;

  addOpportunity: (
    opportunity: Omit<
      Opportunity,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeOpportunity: (
    id: string
  ) => Promise<void>;
}

export default function OpportunityWorkspace({
  opportunity,
  saveOpportunity,
  addOpportunity,
  removeOpportunity,
}: OpportunityWorkspaceProps) {
  const router = useRouter();

  const [editedOpportunity, setEditedOpportunity] =
    useState<Opportunity>(opportunity);

  const [showPhotos, setShowPhotos] =
    useState(false);

  useEffect(() => {
    setEditedOpportunity(opportunity);
  }, [opportunity]);

  const isNewOpportunity =
    editedOpportunity.id === "";

  function updateField<K extends keyof Opportunity>(
    field: K,
    value: Opportunity[K]
  ) {
    setEditedOpportunity((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">

      <div className="mx-auto max-w-6xl p-6 space-y-6">

        {/* ====================================================== */}
        {/* Header */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Opportunity
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                {isNewOpportunity
                  ? "New Opportunity"
                  : editedOpportunity.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Opportunity #
                {" "}
                {editedOpportunity.opportunity_number || "New"}
              </p>

            </div>

            <div className="w-full lg:w-64">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                value={editedOpportunity.opportunity_status}
                onChange={(e) =>
                  updateField(
                    "opportunity_status",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Site Visit Booked</option>
                <option>Quoted</option>
                <option>Won</option>
                <option>Lost</option>
                <option>Cancelled</option>
              </select>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Opportunity Details */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Opportunity Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Title */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Opportunity Title
              </label>

              <input
                value={editedOpportunity.title}
                onChange={(e) =>
                  updateField(
                    "title",
                    e.target.value
                  )
                }
                placeholder="Install CCTV, Replace Fence..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Customer */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Customer ID
              </label>

              <input
                value={editedOpportunity.customer_id}
                onChange={(e) =>
                  updateField(
                    "customer_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Service Address */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Service Address
              </label>

              <input
                value={editedOpportunity.property_id}
                onChange={(e) =>
                  updateField(
                    "property_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Estimated Value */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Estimated Value
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  value={editedOpportunity.estimated_value ?? ""}
                  onChange={(e) =>
                    updateField(
                      "estimated_value",
                      e.target.value === ""
                        ? null
                        : Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 pl-8 pr-4 py-3"
                />

              </div>

            </div>
                        {/* Expected Start Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Expected Start Date
              </label>

              <input
                type="date"
                value={editedOpportunity.expected_start_date ?? ""}
                onChange={(e) =>
                  updateField(
                    "expected_start_date",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Description */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Description
          </h2>

          <textarea
            rows={6}
            value={editedOpportunity.description ?? ""}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value || null
              )
            }
            placeholder="Describe the work requested by the customer..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================================== */}
        {/* Notes */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Notes
          </h2>

          <textarea
            rows={8}
            value={editedOpportunity.notes ?? ""}
            onChange={(e) =>
              updateField(
                "notes",
                e.target.value || null
              )
            }
            placeholder="Record conversations, site visit findings, customer requests and other internal notes..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================================== */}
        {/* Related Records */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Related Records
          </h2>

          <div className="divide-y divide-slate-200">

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  Quotes
                </h3>
                <p className="text-sm text-slate-500">
                  Create and manage customer quotes.
                </p>
              </div>

              <span className="text-slate-400 text-xl">
                →
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  Calendar
                </h3>
                <p className="text-sm text-slate-500">
                  Site visits and scheduled work.
                </p>
              </div>

              <span className="text-slate-400 text-xl">
                →
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  Invoices
                </h3>
                <p className="text-sm text-slate-500">
                  View invoices linked to this opportunity.
                </p>
              </div>

              <span className="text-slate-400 text-xl">
                →
              </span>

            </button>

            <button
              type="button"
              onClick={() => setShowPhotos(true)}
              className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  Photos
                </h3>
                <p className="text-sm text-slate-500">
                  Site inspection and progress photos.
                </p>
              </div>

              <span className="text-slate-400 text-xl">
                →
              </span>

            </button>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Actions */}
        {/* ====================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 mb-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Save your changes, create a quote or remove this opportunity.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
                type="button"
                onClick={async () => {
                  try {

                    if (isNewOpportunity) {

                      const {
                        id,
                        created_at,
                        updated_at,
                        ...newOpportunity
                      } = editedOpportunity;

                      await addOpportunity(newOpportunity);

                      alert(
                        "✅ Opportunity created successfully."
                      );

                    } else {

                      await saveOpportunity(
                        editedOpportunity
                      );

                      alert(
                        "✅ Opportunity saved successfully."
                      );

                    }

                  } catch (err) {

                    console.error(err);

                    alert(
                      "Unable to save opportunity."
                    );

                  }
                }}
                className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition"
              >
                💾 Save Opportunity
              </button>

              {/* Create Quote */}

              <button
                type="button"
                onClick={async () => {

                  try {

                    const response = await fetch(
                      "/api/quotes/create-from-opportunity",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          opportunityId:
                            editedOpportunity.id,
                        }),
                      }
                    );

                    const result =
                      await response.json();

                    if (
                      !response.ok ||
                      !result.success
                    ) {
                      throw new Error(
                        result.message ??
                          "Unable to create quote."
                      );
                    }

                    alert(
                      `Quote #${result.quoteNumber} created successfully.`
                    );

                    router.push(
                      `/quotes?quote=${result.quoteId}`
                    );

                  } catch (error) {

                    console.error(error);

                    alert(
                      "Unable to create quote."
                    );

                  }

                }}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                📄 Create Quote
              </button>

              {/* Delete */}

              {!isNewOpportunity && (

                <button
                  type="button"
                  onClick={async () => {

                    if (
                      !confirm(
                        `Delete "${editedOpportunity.title}"?`
                      )
                    ) {
                      return;
                    }

                    try {

                      await removeOpportunity(
                        editedOpportunity.id
                      );

                      alert(
                        "Opportunity deleted."
                      );

                    } catch (err) {

                      console.error(err);

                      alert(
                        "Unable to delete opportunity."
                      );

                    }

                  }}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition"
                >
                  🗑 Delete Opportunity
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Photo Gallery */}
      {/* ====================================================== */}

      <Modal
        isOpen={showPhotos}
        onClose={() => setShowPhotos(false)}
        title="Opportunity Photos"
        size="7xl"
      >
        <PhotoGallery
          opportunityId={editedOpportunity.id}
          title="Opportunity Photos"
        />
      </Modal>

    </div>

  );

}