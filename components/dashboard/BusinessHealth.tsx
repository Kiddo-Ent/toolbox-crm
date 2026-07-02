"use client";

interface HealthItem {
  title: string;
  value: string;
  status: "good" | "warning" | "alert";
}

const healthItems: HealthItem[] = [
  {
    title: "Active Customers",
    value: "412",
    status: "good",
  },
  {
    title: "Jobs Scheduled Today",
    value: "8",
    status: "good",
  },
  {
    title: "Pending Quotes",
    value: "5",
    status: "warning",
  },
  {
    title: "Overdue Invoices",
    value: "2",
    status: "alert",
  },
  {
    title: "Vehicles Requiring Service",
    value: "0",
    status: "good",
  },
  {
    title: "Staff Clocked In",
    value: "6",
    status: "good",
  },
];

function statusColour(status: HealthItem["status"]) {
  switch (status) {
    case "good":
      return {
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700",
        text: "Healthy",
      };

    case "warning":
      return {
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-700",
        text: "Monitor",
      };

    case "alert":
      return {
        dot: "bg-rose-500",
        badge: "bg-rose-100 text-rose-700",
        text: "Attention",
      };
  }
}

export default function BusinessHealth() {
  const warningCount = healthItems.filter(
    (item) => item.status !== "good"
  ).length;

  const overallStatus =
    warningCount === 0
      ? {
          title: "Business Healthy",
          colour: "bg-emerald-100 text-emerald-700",
          icon: "🟢",
        }
      : warningCount <= 2
      ? {
          title: "Minor Issues",
          colour: "bg-amber-100 text-amber-700",
          icon: "🟡",
        }
      : {
          title: "Needs Attention",
          colour: "bg-rose-100 text-rose-700",
          icon: "🔴",
        };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Business Health
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live operational snapshot
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
          ❤️
        </div>

      </div>

      {/* Overall Status */}

      <div className="mb-8 rounded-2xl bg-slate-50 p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Overall Status
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              {overallStatus.icon} {overallStatus.title}
            </h3>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${overallStatus.colour}`}
          >
            {warningCount} Issue{warningCount === 1 ? "" : "s"}
          </span>

        </div>

      </div>

      {/* Health Items */}

      <div className="space-y-4">

        {healthItems.map((item) => {
          const status = statusColour(item.status);

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`h-3 w-3 rounded-full ${status.dot}`}
                />

                <div>

                  <p className="font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {status.text}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-xl font-bold text-slate-800">
                  {item.value}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${status.badge}`}
                >
                  {status.text}
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* Footer */}

      <button
        className="mt-8 w-full rounded-xl border border-emerald-600 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
      >
        View Operational Report
      </button>

    </div>
  );
}