"use client";

interface RevenueMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const metrics: RevenueMetric[] = [
  {
    label: "Today",
    value: "$1,820",
    change: "+8%",
    positive: true,
  },
  {
    label: "This Week",
    value: "$8,540",
    change: "+14%",
    positive: true,
  },
  {
    label: "This Month",
    value: "$48,250",
    change: "+12%",
    positive: true,
  },
];

export default function RevenueCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Revenue
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Financial performance
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
          💰
        </div>

      </div>

      {/* Main Figure */}

      <div className="mb-8">

        <p className="text-sm text-slate-500">
          Monthly Revenue
        </p>

        <h1 className="mt-2 text-5xl font-bold text-slate-800">
          $48,250
        </h1>

        <p className="mt-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          ▲ 12% vs last month
        </p>

      </div>

      {/* Revenue Breakdown */}

      <div className="space-y-4">

        {metrics.map((metric) => (

          <div
            key={metric.label}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4"
          >

            <div>

              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <p className="mt-1 text-xl font-bold text-slate-800">
                {metric.value}
              </p>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                metric.positive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {metric.change}
            </span>

          </div>

        ))}

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