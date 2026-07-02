"use client";

import { useEffect, useState } from "react";

import { Job } from "@/types/job";

interface JobWorkspaceProps {
  job: Job;

  saveJob: (
    job: Job
  ) => Promise<void>;

  addJob: (
    job: Omit<
      Job,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeJob: (
    id: string
  ) => Promise<void>;
}

export default function JobWorkspace({
  job,
  saveJob,
  addJob,
  removeJob,
}: JobWorkspaceProps) {

  const [editedJob, setEditedJob] =
    useState<Job>(job);

  useEffect(() => {
    setEditedJob(job);
  }, [job]);

  const isNewJob =
    editedJob.id === "";

  function updateField<
    K extends keyof Job
  >(
    field: K,
    value: Job[K]
  ) {
    setEditedJob((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (

    <div className="h-full overflow-y-auto rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="sticky top-0 z-10 border-b bg-white p-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              {isNewJob
                ? "New Job"
                : `Job #${editedJob.job_number}`}

            </h1>

            <p className="mt-2 text-slate-500">

              Schedule work, assign technicians and
              monitor job progress.

            </p>

          </div>

          <span
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold

              ${
                editedJob.status ===
                "Completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : editedJob.status ===
                    "In Progress"
                  ? "bg-amber-100 text-amber-700"
                  : editedJob.status ===
                    "Scheduled"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-700"
              }
            `}
          >

            {editedJob.status}

          </span>

        </div>

      </div>

      <div className="p-8">

        {/* ====================================== */}
        {/* Job Details */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">

            Job Details

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Job Title */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">

                Job Title

              </label>

              <input
                value={editedJob.title}
                onChange={(e) =>
                  updateField(
                    "title",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Customer */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Customer ID

              </label>

              <input
                value={
                  editedJob.customer_id
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

            {/* Property */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Property ID

              </label>

              <input
                value={
                  editedJob.property_id
                }
                onChange={(e) =>
                  updateField(
                    "property_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Opportunity */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Opportunity ID

              </label>

              <input
                value={
                  editedJob.opportunity_id
                }
                onChange={(e) =>
                  updateField(
                    "opportunity_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Quote */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Quote ID

              </label>

              <input
                value={
                  editedJob.quote_id ?? ""
                }
                onChange={(e) =>
                  updateField(
                    "quote_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Status

              </label>

              <select
                value={
                  editedJob.status
                }
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              >

                <option>
                  Scheduled
                </option>

                <option>
                  Assigned
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Waiting Parts
                </option>

                <option>
                  Completed
                </option>

                <option>
                  Invoiced
                </option>

                <option>
                  Closed
                </option>

              </select>

            </div>

            {/* Priority */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Priority

              </label>

              <select
                value={
                  editedJob.priority
                }
                onChange={(e) =>
                  updateField(
                    "priority",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              >

                <option>
                  Low
                </option>

                <option>
                  Normal
                </option>

                <option>
                  High
                </option>

                <option>
                  Urgent
                </option>

              </select>

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Scheduling & Assignment */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">
            Scheduling & Assignment
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Scheduled Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Scheduled Date
              </label>

              <input
                type="date"
                value={editedJob.scheduled_date ?? ""}
                onChange={(e) =>
                  updateField(
                    "scheduled_date",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Completed Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Completed Date
              </label>

              <input
                type="date"
                value={editedJob.completed_date ?? ""}
                onChange={(e) =>
                  updateField(
                    "completed_date",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Assigned Technician */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Assigned Technician
              </label>

              <input
                value={editedJob.assigned_to ?? ""}
                onChange={(e) =>
                  updateField(
                    "assigned_to",
                    e.target.value || null
                  )
                }
                placeholder="Employee assigned to this job"
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Time & Costs */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">
            Time & Costs
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Estimated Hours */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Estimated Hours
              </label>

              <input
                type="number"
                step="0.25"
                value={editedJob.estimated_hours}
                onChange={(e) =>
                  updateField(
                    "estimated_hours",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Actual Hours */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Actual Hours
              </label>

              <input
                type="number"
                step="0.25"
                value={editedJob.actual_hours}
                onChange={(e) =>
                  updateField(
                    "actual_hours",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Labour Cost */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Labour Cost
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  value={editedJob.labour_cost}
                  onChange={(e) =>
                    updateField(
                      "labour_cost",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border pl-8 pr-4 py-3"
                />

              </div>

            </div>

            {/* Materials Cost */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Materials Cost
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  value={editedJob.materials_cost}
                  onChange={(e) =>
                    updateField(
                      "materials_cost",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border pl-8 pr-4 py-3"
                />

              </div>

            </div>

            {/* Total Cost */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Total Cost
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  value={editedJob.total_cost}
                  onChange={(e) =>
                    updateField(
                      "total_cost",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border pl-8 pr-4 py-3 font-semibold"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Job Summary */}
        {/* ====================================== */}

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">
            Job Summary
          </h2>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedJob.status}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Priority
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedJob.priority}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Assigned To
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedJob.assigned_to || "Unassigned"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Cost
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-600">
                $
                {editedJob.total_cost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Job Notes */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">
            Job Notes
          </h2>

          <textarea
            rows={8}
            value={editedJob.notes ?? ""}
            onChange={(e) =>
              updateField(
                "notes",
                e.target.value || null
              )
            }
            placeholder="Record site notes, customer requests, hazards, materials used and other important information..."
            className="w-full rounded-lg border px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================== */}
        {/* Related Records */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <h2 className="mb-6 text-xl font-bold">
            Related Records
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Photos */}

            <div className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md">

              <div className="mb-4 text-4xl">
                📷
              </div>

              <h3 className="text-lg font-semibold">
                Photos
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Before, during and after job photos.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                View Photos
              </button>

            </div>

            {/* Documents */}

            <div className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md">

              <div className="mb-4 text-4xl">
                📁
              </div>

              <h3 className="text-lg font-semibold">
                Documents
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Manuals, permits, plans and attachments.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white transition hover:bg-purple-700"
              >
                Open Documents
              </button>

            </div>

            {/* Timesheets */}

            <div className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md">

              <div className="mb-4 text-4xl">
                ⏱
              </div>

              <h3 className="text-lg font-semibold">
                Timesheets
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Employee hours and labour tracking.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700"
              >
                View Timesheets
              </button>

            </div>

            {/* Invoices */}

            <div className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md">

              <div className="mb-4 text-4xl">
                🧾
              </div>

              <h3 className="text-lg font-semibold">
                Invoice
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Generate or review invoices for this job.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
              >
                View Invoice
              </button>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Job Checklist */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Job Checklist
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              Coming Soon
            </span>

          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10">

            <div className="text-center">

              <div className="mb-4 text-5xl">
                ✔
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                Digital Job Checklists
              </h3>

              <p className="mt-2 text-slate-500">
                Complete safety inspections, quality assurance,
                customer sign-off and compliance forms directly
                from the job.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Activity Timeline */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-8">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Job Timeline
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              Coming Soon
            </span>

          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10">

            <div className="text-center">

              <div className="mb-4 text-5xl">
                📍
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                Complete Job History
              </h3>

              <p className="mt-2 text-slate-500">
                Every status change, technician assignment,
                customer communication, uploaded photo,
                timesheet entry and invoice will appear here.
              </p>

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Job Actions */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Left */}

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                Job Actions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Save changes, schedule work, invoice the customer or close the job.
              </p>

            </div>

            {/* Right */}

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
                onClick={async () => {
                  try {

                    if (isNewJob) {

                      const {
                        id,
                        created_at,
                        updated_at,
                        ...newJob
                      } = editedJob;

                      await addJob(newJob);

                      alert("✅ Job created successfully.");

                    } else {

                      await saveJob(editedJob);

                      alert("✅ Job saved successfully.");

                    }

                  } catch (err) {

                    console.error(err);

                    alert("Unable to save job.");

                  }
                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                💾 Save Job
              </button>

              {/* Schedule */}

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📅 Schedule
              </button>

              {/* Timesheet */}

              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                ⏱ Timesheet
              </button>

              {/* Create Invoice */}

              <button
                type="button"
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                🧾 Create Invoice
              </button>

              {/* Mark Complete */}

              <button
                type="button"
                onClick={() =>
                  updateField("status", "Completed")
                }
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                ✔ Complete
              </button>

              {/* Delete */}

              {!isNewJob && (

                <button
                  onClick={async () => {

                    if (
                      !confirm(
                        `Delete "${editedJob.title}"?`
                      )
                    ) {
                      return;
                    }

                    try {

                      await removeJob(
                        editedJob.id
                      );

                      alert("Job deleted.");

                    } catch (err) {

                      console.error(err);

                      alert(
                        "Unable to delete job."
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