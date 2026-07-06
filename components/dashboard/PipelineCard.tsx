"use client";

import { useMemo } from "react";

import { useOpportunities } from "@/hooks/useOpportunities";

export default function PipelineCard() {
  const { opportunities } = useOpportunities();

  const stages = useMemo(() => {
    const stageNames = [
      "New",
      "Contacted",
      "Site Visit Booked",
      "Quoted",
      "Won",
      "Lost",
      "Cancelled",
    ];

    const total = opportunities.length;

    return stageNames.map((stage) => {
      const stageOpportunities = opportunities.filter(
        (o) =>
          !o.is_deleted &&
          o.opportunity_status === stage
      );

      const count = stageOpportunities.length;

      const value = stageOpportunities.reduce(
        (sum, o) => sum + (o.estimated_value ?? 0),
        0
      );

      const percentage =
        total === 0
          ? 0
          : Math.round((count / total) * 100);

      return {
        name: stage,
        count,
        value,
        percentage,
      };
    });
  }, [opportunities]);

  const totalOpportunities = opportunities.filter(
    (o) => !o.is_deleted
  ).length;

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
            Opportunity Pipeline
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live sales pipeline
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          📈
        </div>

      </div>

      {/* Summary */}

      <div className="mb-8 rounded-xl bg-slate-50 p-5">

        <p className="text-sm text-slate-500">
          Active Opportunities
        </p>

        <h1 className="mt-2 text-5xl font-bold text-slate-800">
          {totalOpportunities}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Across all pipeline stages
        </p>

      </div>

      {/* Pipeline */}

      <div className="space-y-6">

        {stages.map((stage) => (

          <div key={stage.name}>

            <div className="mb-2 flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-800">
                  {stage.name}
                </p>

                <p className="text-sm text-slate-500">
                  ${formatCurrency(stage.value)}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {stage.count}
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-3 rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${stage.percentage}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <button
        className="mt-8 w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        View Opportunities
      </button>

    </div>
  );
}