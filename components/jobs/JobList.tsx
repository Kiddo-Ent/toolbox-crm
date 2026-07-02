"use client";

import { useMemo, useState } from "react";

import { Job } from "@/types/job";

import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];

  selectedJob: Job | null;

  onSelectJob: (
    job: Job
  ) => void;
}

export default function JobList({
  jobs,
  selectedJob,
  onSelectJob,
}: JobListProps) {

  const [search, setSearch] =
    useState("");

  const filteredJobs =
    useMemo(() => {

      const text =
        search.toLowerCase();

      if (!text) return jobs;

      return jobs.filter((job) => {

        return (

          String(job.job_number)
            .includes(text) ||

          job.title
            .toLowerCase()
            .includes(text) ||

          job.status
            .toLowerCase()
            .includes(text) ||

          job.priority
            .toLowerCase()
            .includes(text) ||

          (job.notes ?? "")
            .toLowerCase()
            .includes(text)

        );

      });

    }, [jobs, search]);

  return (

    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Jobs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredJobs.length} of {jobs.length} jobs
        </p>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {filteredJobs.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                🛠️
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Jobs Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search.
              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredJobs.map((job) => (

              <JobCard
                key={job.id}
                job={job}
                selected={
                  selectedJob?.id ===
                  job.id
                }
                onClick={() =>
                  onSelectJob(job)
                }
              />

            ))}

          </div>

        )}

      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex justify-between text-sm">

          <span className="text-slate-500">
            {filteredJobs.length} displayed
          </span>

          <span className="font-medium text-slate-600">
            Total: {jobs.length}
          </span>

        </div>

      </div>

    </div>

  );

}