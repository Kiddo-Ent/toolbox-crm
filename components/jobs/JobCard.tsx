"use client";

import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  selected?: boolean;
  onClick?: () => void;
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-100 text-blue-700";

    case "Assigned":
      return "bg-indigo-100 text-indigo-700";

    case "In Progress":
      return "bg-amber-100 text-amber-700";

    case "Waiting Parts":
      return "bg-orange-100 text-orange-700";

    case "Completed":
      return "bg-emerald-100 text-emerald-700";

    case "Invoiced":
      return "bg-purple-100 text-purple-700";

    case "Closed":
      return "bg-slate-200 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPriorityColour(priority: string) {
  switch (priority) {
    case "Urgent":
      return "text-red-600";

    case "High":
      return "text-orange-600";

    case "Normal":
      return "text-blue-600";

    case "Low":
      return "text-green-600";

    default:
      return "text-slate-600";
  }
}

export default function JobCard({
  job,
  selected = false,
  onClick,
}: JobCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {job.title || "New Job"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Job #{job.job_number}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div>👤 Customer: {job.customer_id || "-"}</div>

        <div>🏡 Property: {job.property_id || "-"}</div>

        <div>📅 {job.scheduled_date ?? "Not Scheduled"}</div>

        <div>
          ⭐ Priority:
          <span
            className={`ml-2 font-semibold ${getPriorityColour(
              job.priority
            )}`}
          >
            {job.priority}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Estimated
          </span>

          <span>{job.estimated_hours} hrs</span>
        </div>

        <div className="mt-2 flex justify-between">
          <span className="text-slate-500">
            Actual
          </span>

          <span>{job.actual_hours} hrs</span>
        </div>

        <div className="mt-3 border-t pt-3 flex justify-between">

          <span className="font-semibold">
            Cost
          </span>

          <span className="text-xl font-bold text-emerald-600">
            $
            {job.total_cost.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

        </div>
      </div>
    </button>
  );
}