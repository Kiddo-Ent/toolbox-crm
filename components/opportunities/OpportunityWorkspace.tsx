"use client";

import { useEffect, useState } from "react";

import { Opportunity } from "@/types/opportunity";

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

  const [editedOpportunity, setEditedOpportunity] =
    useState<Opportunity>(opportunity);

  useEffect(() => {
    setEditedOpportunity(opportunity);
  }, [opportunity]);

  function updateField<
    K extends keyof Opportunity
  >(
    field: K,
    value: Opportunity[K]
  ) {
    setEditedOpportunity((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const isNewOpportunity =
    editedOpportunity.id === "";

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

                {isNewOpportunity
                  ? "New Opportunity"
                  : editedOpportunity.title}

              </h1>

              <p className="mt-2 text-slate-500">

                Opportunity #
                {editedOpportunity.opportunity_number || "New"}

              </p>

            </div>

            <span
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold"
            >
              {editedOpportunity.status}
            </span>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Opportunity Details */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Opportunity Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Opportunity Number */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Opportunity Number
              </label>

              <input
                readOnly
                value={
                  editedOpportunity.opportunity_number
                }
                className="w-full rounded-lg border bg-slate-100 px-4 py-3"
              />

            </div>

            {/* Status */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Status
              </label>

              <select
                value={editedOpportunity.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option>Lead</option>
                <option>Site Visit</option>
                <option>Quoting</option>
                <option>Quote Sent</option>
                <option>Negotiating</option>
                <option>Won</option>
                <option>Lost</option>
              </select>

            </div>

            {/* Title */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-2">
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
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Customer */}

            <div>

              <label className="block text-sm font-semibold mb-2">
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
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Property */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Property ID
              </label>

              <input
                value={editedOpportunity.property_id}
                onChange={(e) =>
                  updateField(
                    "property_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Financial & Scheduling */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Financial & Scheduling
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Estimated Value */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Estimated Value
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  value={editedOpportunity.estimated_value}
                  onChange={(e) =>
                    updateField(
                      "estimated_value",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border pl-8 pr-4 py-3"
                />

              </div>

            </div>

            {/* Expected Close Date */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Expected Close Date
              </label>

              <input
                type="date"
                value={
                  editedOpportunity.expected_close_date ?? ""
                }
                onChange={(e) =>
                  updateField(
                    "expected_close_date",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Assigned To */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-2">
                Assigned To
              </label>

              <input
                value={
                  editedOpportunity.assigned_to ?? ""
                }
                onChange={(e) =>
                  updateField(
                    "assigned_to",
                    e.target.value || null
                  )
                }
                placeholder="Employee responsible for this opportunity"
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Description */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Opportunity Description
          </h2>

          <textarea
            rows={6}
            value={
              editedOpportunity.description ?? ""
            }
            onChange={(e) =>
              updateField(
                "description",
                e.target.value || null
              )
            }
            placeholder="Describe the work requested by the customer..."
            className="w-full rounded-lg border px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================================== */}
        {/* Opportunity Summary */}
        {/* ====================================================== */}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-8 mb-6 border border-blue-100">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedOpportunity.status}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Estimated Value
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                $
                {editedOpportunity.estimated_value.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Expected Close
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedOpportunity.expected_close_date || "Not Set"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Assigned To
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedOpportunity.assigned_to || "Unassigned"}
              </p>

            </div>

          </div>

        </div>
                {/* ====================================================== */}
        {/* Internal Notes */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Internal Notes
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
            className="w-full rounded-lg border px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================================== */}
        {/* Related Records */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Related Records
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Quotes */}

            <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                📄
              </div>

              <h3 className="font-semibold text-lg">
                Quotes
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create and manage quote versions for this opportunity.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition"
              >
                View Quotes
              </button>

            </div>

            {/* Jobs */}

            <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                📅
              </div>

              <h3 className="font-semibold text-lg">
                Jobs
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Jobs created once the opportunity is accepted.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 transition"
              >
                View Jobs
              </button>

            </div>

            {/* Documents */}

            <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                📁
              </div>

              <h3 className="font-semibold text-lg">
                Documents
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Store plans, permits and customer documents.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700 transition"
              >
                Open Documents
              </button>

            </div>

            {/* Photos */}

            <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                📷
              </div>

              <h3 className="font-semibold text-lg">
                Photos
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Site inspections, before and after photos.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 transition"
              >
                View Photos
              </button>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Opportunity Timeline */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-bold">
              Activity Timeline
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              Coming Soon
            </span>

          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10">

            <div className="text-center">

              <div className="text-5xl mb-4">
                📈
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                Opportunity Timeline
              </h3>

              <p className="mt-2 text-slate-500">
                Every interaction will appear here, including site visits,
                emails, quotes, phone calls, status changes and completed jobs.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Sales Pipeline */}
        {/* ====================================================== */}

        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-100 p-8 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Sales Pipeline
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">

            {[
              "Lead",
              "Site Visit",
              "Quoting",
              "Quote Sent",
              "Negotiating",
              "Won",
              "Lost",
            ].map((stage) => (

              <div
                key={stage}
                className={`rounded-xl border p-4 text-center transition ${
                  editedOpportunity.status === stage
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                    : "border-slate-200 bg-white"
                }`}
              >

                <div className="text-sm font-semibold">
                  {stage}
                </div>

              </div>

            ))}

          </div>

        </div>
                {/* ====================================================== */}
        {/* Actions */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Left */}

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                Opportunity Actions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Save your changes, create a quote or convert this opportunity into a job.
              </p>

            </div>

            {/* Right */}

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
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
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                💾 Save Opportunity
              </button>

              {/* Create Quote */}

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📄 Create Quote
              </button>

              {/* Convert to Job */}

              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                ✔ Convert to Job
              </button>

              {/* Email Customer */}

              <button
                type="button"
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                📧 Email Customer
              </button>

              {/* Delete */}

              {!isNewOpportunity && (

                <button
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