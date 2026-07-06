"use client";

import { useMemo } from "react";

import { useOpportunities } from "@/hooks/useOpportunities";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  colour: "blue" | "amber" | "emerald" | "purple";
  icon: string;
}

function StatCard({
  title,
  value,
  subtitle,
  colour,
  icon,
}: StatCardProps) {
  const colours = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    amber: {
      border: "border-amber-500",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
  };

  const c = colours[colour];

  return (
    <div
      className={`rounded-2xl border-t-4 ${c.border} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-500">
          {title}
        </h3>

        <div className={`${c.bg} rounded-xl px-3 py-2`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-4xl font-bold text-slate-800">
          {value}
        </h2>

        <p className={`mt-3 text-sm font-semibold ${c.text}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function OpportunityStats() {
  const { opportunities } = useOpportunities();

  const stats = useMemo(() => {
    const open = opportunities.filter(
      (o) =>
        o.opportunity_status !== "Won" &&
        o.opportunity_status !== "Lost" &&
        o.opportunity_status !== "Cancelled"
    );

    const quoting = opportunities.filter(
      (o) => o.opportunity_status === "Quoted"
    );

    const won = opportunities.filter(
      (o) => o.opportunity_status === "Won"
    );

    const pipelineValue = open.reduce(
      (sum, o) => sum + (o.estimated_value ?? 0),
      0
    );

    return {
      open,
      quoting,
      won,
      pipelineValue,
    };
  }, [opportunities]);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <StatCard
        title="Open Opportunities"
        value={stats.open.length.toString()}
        subtitle="Currently Active"
        colour="blue"
        icon="💼"
      />

      <StatCard
        title="Quoted"
        value={stats.quoting.length.toString()}
        subtitle="Quotes Sent"
        colour="amber"
        icon="📝"
      />

      <StatCard
        title="Won"
        value={stats.won.length.toString()}
        subtitle="Successful Opportunities"
        colour="emerald"
        icon="🏆"
      />

      <StatCard
        title="Pipeline Value"
        value={`$${stats.pipelineValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        subtitle="Estimated Opportunity Value"
        colour="purple"
        icon="📈"
      />
    </div>
  );
}