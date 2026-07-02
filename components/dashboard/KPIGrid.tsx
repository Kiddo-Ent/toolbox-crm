"use client";

import { useCustomers } from "@/hooks/useCustomers";
import { useQuotes } from "@/hooks/useQuotes";
import { useJobs } from "@/hooks/useJobs";
import { useOpportunities } from "@/hooks/useOpportunities";

import KPICard from "./KPICard";

export default function KPIGrid() {
  const { customers } = useCustomers();
  const { quotes } = useQuotes();
  const { jobs } = useJobs();
  const { opportunities } = useOpportunities();

  const todaysJobs = jobs.filter((job) => {
    if (!job.scheduled_date) return false;

    const today = new Date().toISOString().slice(0, 10);

    return job.scheduled_date === today;
  });

  const awaitingQuotes = quotes.filter(
    (quote) =>
      quote.quote_status === "Draft" ||
      quote.quote_status === "Sent"
  );

  const revenue = jobs.reduce(
    (sum, job) => sum + (job.total_cost ?? 0),
    0
  );

  return (
    <div className="grid gap-6 lg:grid-cols-4">

      <KPICard
        title="Customers"
        value={customers.length.toString()}
        subtitle="Live customer records"
        colour="emerald"
        icon="👥"
      />

      <KPICard
        title="Jobs Today"
        value={todaysJobs.length.toString()}
        subtitle="Scheduled today"
        colour="blue"
        icon="📅"
      />

      <KPICard
        title="Quotes"
        value={awaitingQuotes.length.toString()}
        subtitle="Draft / Sent"
        colour="amber"
        icon="📝"
      />

      <KPICard
        title="Revenue"
        value={`$${revenue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        subtitle="Completed job value"
        colour="green"
        icon="💰"
      />

    </div>
  );
}