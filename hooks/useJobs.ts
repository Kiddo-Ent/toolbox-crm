"use client";

import { useEffect, useState } from "react";

import { Job } from "@/types/job";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/repositories/jobRepository";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getJobs();

      setJobs(data);

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveJob(job: Job) {
    await updateJob(job);
    await refresh();
  }

  async function addJob(
    job: Omit<Job, "id" | "created_at" | "updated_at">
  ) {
    await createJob(job);
    await refresh();
  }

  async function removeJob(id: string) {
    await deleteJob(id);
    await refresh();
  }

  return {
    jobs,
    loading,
    error,

    refresh,

    saveJob,
    addJob,
    removeJob,
  };
}