"use client";

interface StatCard {
  title: string;
  value: string;
  change?: string;
  colour:
    | "blue"
    | "emerald"
    | "amber"
    | "purple";
}

const stats: StatCard[] = [
  {
    title: "Total Customers",
    value: "412",
    change: "+18 this month",
    colour: "blue",
  },
  {
    title: "Active Customers",
    value: "398",
    change: "96.6%",
    colour: "emerald",
  },
  {
    title: "New This Month",
    value: "18",
    change: "+5 this week",
    colour: "amber",
  },
  {
    title: "Companies",
    value: "67",
    change: "Business Accounts",
    colour: "purple",
  },
];

function getColours(colour: StatCard["colour"]) {
  switch (colour) {
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

    case "amber":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
      };

    case "purple":
      return {
        border: "border-purple-500",
        bg: "bg-purple-50",
        text: "text-purple-700",
      };
  }
}

export default function CustomerStats() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">

      {stats.map((stat) => {
        const colours = getColours(stat.colour);

        return (
          <div
            key={stat.title}
            className={`
              rounded-2xl
              border-t-4
              ${colours.border}
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

              <h3 className="text-sm font-semibold text-slate-500">
                {stat.title}
              </h3>

              <div
                className={`
                  rounded-xl
                  ${colours.bg}
                  px-3
                  py-2
                `}
              >
                <span className="text-xl">
                  👥
                </span>
              </div>

            </div>

            {/* Value */}

            <div className="mt-6">

              <h2 className="text-4xl font-bold text-slate-800">
                {stat.value}
              </h2>

              {stat.change && (
                <p
                  className={`mt-3 text-sm font-semibold ${colours.text}`}
                >
                  {stat.change}
                </p>
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
}