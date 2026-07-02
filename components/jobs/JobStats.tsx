"use client";

import { Job } from "@/types/job";

interface JobStatsProps {
  jobs: Job[];
}

interface Stat {
  title: string;
  value: string;
  subtitle: string;
  colour:
    | "blue"
    | "amber"
    | "emerald"
    | "purple";
  icon: string;
}

function colours(colour: Stat["colour"]) {
  switch (colour) {
    case "blue":
      return {
        border: "border-blue-500",
        bg: "bg-blue-50",
        text: "text-blue-700",
      };

    case "amber":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
      };

    case "emerald":
      return {
        border: "border-emerald-500",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
      };

    case "purple":
      return {
        border: "border-purple-500",
        bg: "bg-purple-50",
        text: "text-purple-700",
      };
  }
}

export default function JobStats({
  jobs,
}: JobStatsProps) {

  const scheduled =
    jobs.filter(
      (j) => j.status === "Scheduled"
    ).length;

  const inProgress =
    jobs.filter(
      (j) => j.status === "In Progress"
    ).length;

  const completed =
    jobs.filter(
      (j) => j.status === "Completed"
    ).length;

  const revenue =
    jobs
      .filter(
        (j) =>
          j.status === "Completed" ||
          j.status === "Invoiced"
      )
      .reduce(
        (sum, j) => sum + j.total_cost,
        0
      );

  const stats: Stat[] = [

    {
      title: "Scheduled",
      value: scheduled.toString(),
      subtitle: "Upcoming work",
      colour: "blue",
      icon: "📅",
    },

    {
      title: "In Progress",
      value: inProgress.toString(),
      subtitle: "Active today",
      colour: "amber",
      icon: "🛠️",
    },

    {
      title: "Completed",
      value: completed.toString(),
      subtitle: "Ready to invoice",
      colour: "emerald",
      icon: "✅",
    },

    {
      title: "Revenue",
      value: `$${revenue.toLocaleString(undefined,{
        minimumFractionDigits:2,
        maximumFractionDigits:2,
      })}`,
      subtitle: "Completed jobs",
      colour: "purple",
      icon: "💰",
    },

  ];

  return (

    <div className="grid gap-6 lg:grid-cols-4">

      {stats.map((stat) => {

        const style =
          colours(stat.colour);

        return (

          <div
            key={stat.title}
            className={`
              rounded-2xl
              border-t-4
              ${style.border}
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            `}
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

              </div>

              <div
                className={`rounded-xl ${style.bg} px-3 py-2`}
              >

                <span className="text-2xl">
                  {stat.icon}
                </span>

              </div>

            </div>

            <div className="mt-6">

              <h2 className="text-4xl font-bold text-slate-800">
                {stat.value}
              </h2>

              <p
                className={`mt-3 text-sm font-semibold ${style.text}`}
              >
                {stat.subtitle}
              </p>

            </div>

          </div>

        );

      })}

    </div>

  );

}