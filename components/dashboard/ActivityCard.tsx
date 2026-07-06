"use client";

import { useMemo } from "react";

import { useCustomers } from "@/hooks/useCustomers";
import { useOpportunities } from "@/hooks/useOpportunities";

export default function ActivityCard() {
  const { customers } = useCustomers();
  const { opportunities } = useOpportunities();

  const activity = useMemo(() => {
    const customerActivity = customers.map((customer) => ({
      id: customer.id,
      icon: "👤",
      title: "New Customer",
      description: `${customer.first_name} ${customer.last_name}`,
      date: customer.created_at,
      colour: "bg-purple-500",
    }));

    const opportunityActivity = opportunities.map((opportunity) => ({
      id: opportunity.id,
      icon: "💼",
      title: "New Opportunity",
      description: opportunity.title,
      date: opportunity.created_at,
      colour: "bg-blue-500",
    }));

    return [...customerActivity, ...opportunityActivity]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 8);
  }, [customers, opportunities]);

  function formatDate(date: string) {
    return new Date(date).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live business activity
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
          📈
        </div>

      </div>

      {/* Activity Feed */}

      {activity.length === 0 ? (

        <div className="py-12 text-center">

          <div className="mb-4 text-5xl">
            📋
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            No recent activity
          </h3>

          <p className="mt-2 text-slate-500">
            Activity will appear here as customers and opportunities are created.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {activity.map((item, index) => (

            <div
              key={`${item.title}-${item.id}`}
              className="flex gap-4"
            >

              {/* Timeline */}

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${item.colour}`}
                >
                  {item.icon}
                </div>

                {index !== activity.length - 1 && (
                  <div className="mt-2 h-10 w-0.5 bg-slate-200" />
                )}

              </div>

              {/* Details */}

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {formatDate(item.date)}
                  </span>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Footer */}

      <button
        className="mt-6 w-full rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        View Activity Log
      </button>

    </div>
  );
}