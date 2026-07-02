"use client";

import { useEffect, useState } from "react";

import { Job } from "@/types/job";
import { useJobs } from "@/hooks/useJobs";

import JobStats from "./JobStats";
import JobToolbar from "./JobToolbar";
import JobList from "./JobList";
import JobWorkspace from "./JobWorkspace";

export default function JobDashboard() {
  const {
    jobs,
    loading,
    error,
    saveJob,
    addJob,
    removeJob,
    refresh,
  } = useJobs();

  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    if (
      jobs.length > 0 &&
      !selectedJob
    ) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  function createNewJob() {
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const newJob: Job = {
      id: "",

      job_number: 0,

      customer_id: "",

      property_id: "",

      opportunity_id: "",

      quote_id: "",

      title: "",

      description: null,

      status: "Scheduled",

      priority: "Normal",

      scheduled_date: today,

      completed_date: null,

      assigned_to: null,

      estimated_hours: 0,

      actual_hours: 0,

      labour_cost: 0,

      materials_cost: 0,

      total_cost: 0,

      notes: null,

      created_at: "",

      updated_at: "",

      is_deleted: false,

      deleted_at: null,
    };

    setSelectedJob(newJob);
  }

  const filteredJobs =
    jobs.filter((job) => {

      const text =
        search.toLowerCase();

      return (

        String(job.job_number)
          .includes(text) ||

        job.title
          .toLowerCase()
          .includes(text) ||

        job.status
          .toLowerCase()
          .includes(text) ||

        (job.notes ?? "")
          .toLowerCase()
          .includes(text)

      );

    });

  return (

    <div className="space-y-6">

      {/* Statistics */}

      <JobStats
        jobs={jobs}
      />

      {/* Toolbar */}

      <JobToolbar
        search={search}
        onSearchChange={
          setSearch
        }
        onNewJob={
          createNewJob
        }
        onRefresh={
          refresh
        }
        totalJobs={
          jobs.length
        }
      />

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white shadow-sm p-12 text-center">

          <h2 className="text-xl font-semibold">

            Loading Jobs...

          </h2>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">

          {error}

        </div>

      )}

      {/* Main Layout */}

      {!loading &&
        !error && (

        <div className="grid grid-cols-12 gap-6 h-[75vh]">

          {/* Job List */}

          <div className="col-span-4">

            <JobList
              jobs={
                filteredJobs
              }
              selectedJob={
                selectedJob
              }
              onSelectJob={
                setSelectedJob
              }
            />

          </div>

          {/* Workspace */}

          <div className="col-span-8">

            {selectedJob ? (

              <JobWorkspace
                job={
                  selectedJob
                }
                saveJob={
                  saveJob
                }
                addJob={
                  addJob
                }
                removeJob={
                  removeJob
                }
              />

            ) : (

              <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow-sm">

                <div className="text-center">

                  <div className="text-6xl mb-6">

                    🛠️

                  </div>

                  <h2 className="text-2xl font-bold text-slate-700">

                    No Job Selected

                  </h2>

                  <p className="mt-3 text-slate-500">

                    Select a job from the list
                    or create a new job.

                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}