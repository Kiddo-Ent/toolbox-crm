"use client";

import { useMemo } from "react";

import { useJobs } from "@/hooks/useJobs";

export default function RevenueCard() {
  const { jobs } = useJobs();

  const revenue = useMemo(() => {
    const completedJobs = jobs.filter(
      (job) =>
        !job.is_deleted &&
        job.status === "Completed"
    );

    const totalRevenue = completedJobs.reduce(
      (sum, job) => sum + (job.total_cost ?? 0),
      0
    );

    const totalLabour = completedJobs.reduce(
      (sum, job) => sum + (job.labour_cost ?? 0),
      0
    );

    const totalMaterials = completedJobs.reduce(
      (sum, job) => sum + (job.materials_cost ?? 0),
      0
    );

    return {
      completedJobs: completedJobs.length,
      totalRevenue,
      totalLabour,
      totalMaterials,
    };
  }, [jobs]);

  function formatCurrency(value: number) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Revenue
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live financial summary
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
          💰
        </div>

      </div>

      {/* Total Revenue */}

      <div className="mb-8">

        <p className="text-sm text-slate-500">
          Completed Job Revenue
        </p>

        <h1 className="mt-2 text-5xl font-bold text-slate-800">
          ${formatCurrency(revenue.totalRevenue)}
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Based on {revenue.completedJobs} completed job
          {revenue.completedJobs !== 1 ? "s" : ""}
        </p>

      </div>

      {/* Breakdown */}

      <div className="space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">

          <div>

            <p className="text-sm text-slate-500">
              Labour
            </p>

            <p className="mt-1 text-xl font-bold text-slate-800">
              ${formatCurrency(revenue.totalLabour)}
            </p>

          </div>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">

          <div>

            <p className="text-sm text-slate-500">
              Materials
            </p>

            <p className="mt-1 text-xl font-bold text-slate-800">
              ${formatCurrency(revenue.totalMaterials)}
            </p>

          </div>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">

          <div>

            <p className="text-sm text-slate-500">
              Completed Jobs
            </p>

            <p className="mt-1 text-xl font-bold text-slate-800">
              {revenue.completedJobs}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <button
        className="mt-6 w-full rounded-xl border border-emerald-500 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-500 hover:text-white"
      >
        View Financial Reports
      </button>

    </div>
  );
}