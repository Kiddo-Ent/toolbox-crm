"use client";

import { Quote } from "@/types/quote";

interface QuoteStatsProps {
  quotes: Quote[];
}

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  colour:
    | "amber"
    | "blue"
    | "emerald"
    | "purple";
  icon: string;
}

function colours(
  colour: StatCard["colour"]
) {
  switch (colour) {
    case "amber":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
      };

    case "blue":
      return {
        border: "border-blue-500",
        bg: "bg-blue-50",
        text: "text-blue-700",
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

export default function QuoteStats({
  quotes,
}: QuoteStatsProps) {

  const draftQuotes =
    quotes.filter(
      (q) => q.quote_status === "Draft"
    ).length;

  const sentQuotes =
    quotes.filter(
      (q) => q.quote_status === "Sent"
    ).length;

  const acceptedQuotes =
    quotes.filter(
      (q) => q.quote_status === "Accepted"
    ).length;

  const pipelineValue =
    quotes
      .filter(
        (q) =>
          q.quote_status !== "Declined" &&
          q.quote_status !== "Expired"
      )
      .reduce(
        (sum, q) => sum + q.total,
        0
      );

  const stats: StatCard[] = [
    {
      title: "Draft Quotes",
      value: draftQuotes.toString(),
      subtitle: "Awaiting completion",
      colour: "amber",
      icon: "📝",
    },
    {
      title: "Sent Quotes",
      value: sentQuotes.toString(),
      subtitle: "Waiting on customer",
      colour: "blue",
      icon: "📧",
    },
    {
      title: "Accepted",
      value: acceptedQuotes.toString(),
      subtitle: "Ready for scheduling",
      colour: "emerald",
      icon: "✅",
    },
    {
      title: "Pipeline Value",
      value: `$${pipelineValue.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      subtitle: "Open opportunities",
      colour: "purple",
      icon: "💰",
    },
  ];

  return (

    <div className="grid gap-6 lg:grid-cols-4">

      {stats.map((stat) => {

        const style = colours(
          stat.colour
        );

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

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

              </div>

              <div
                className={`
                  rounded-xl
                  ${style.bg}
                  px-3
                  py-2
                `}
              >

                <span className="text-2xl">
                  {stat.icon}
                </span>

              </div>

            </div>

            {/* Value */}

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