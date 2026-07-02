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
    title: "Total Properties",
    value: "184",
    change: "+6 this month",
    colour: "blue",
  },
  {
    title: "Residential",
    value: "148",
    change: "80%",
    colour: "emerald",
  },
  {
    title: "Commercial",
    value: "36",
    change: "20%",
    colour: "amber",
  },
  {
    title: "Active Sites",
    value: "172",
    change: "94%",
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
        icon: "🏡",
      };

    case "emerald":
      return {
        border: "border-emerald-500",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: "🏠",
      };

    case "amber":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: "🏢",
      };

    case "purple":
      return {
        border: "border-purple-500",
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: "📍",
      };
  }
}

export default function PropertyStats() {
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
                <span className="text-2xl">
                  {colours.icon}
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