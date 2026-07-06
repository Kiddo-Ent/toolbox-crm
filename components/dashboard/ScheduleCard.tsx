"use client";

import { useJobs } from "@/hooks/useJobs";

export default function ScheduleCard() {
  const { jobs } = useJobs();

  const today = new Date().toISOString().slice(0, 10);

  const todaysJobs = jobs.filter(
    (job) =>
      job.scheduled_date === today &&
      !job.is_deleted
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Today's Schedule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {todaysJobs.length} scheduled job
            {todaysJobs.length !== 1 ? "s" : ""}
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          📅
        </div>

      </div>

      {/* Jobs */}

      {todaysJobs.length === 0 ? (

        <div className="py-12 text-center">

          <div className="mb-4 text-5xl">
            📅
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            No jobs scheduled today
          </h3>

          <p className="mt-2 text-slate-500">
            Jobs scheduled for today will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {todaysJobs.map((job) => (

            <div
              key={job.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-slate-800">
                  {job.title}
                </h3>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  #{job.job_number}
                </span>

              </div>

              {job.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {job.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {job.priority}
                </span>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {job.status}
                </span>

                {job.estimated_hours > 0 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {job.estimated_hours} hrs
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Footer */}

      <button
        className="mt-6 w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        View Jobs
      </button>

    </div>
  );
}