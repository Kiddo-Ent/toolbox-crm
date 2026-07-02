"use client";

interface ActivityItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  colour: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: 1,
    icon: "💰",
    title: "Invoice Paid",
    description: "INV-1042 • $1,280",
    time: "9:25 AM",
    colour: "bg-emerald-500",
  },
  {
    id: 2,
    icon: "📝",
    title: "Quote Sent",
    description: "Quote #1058 sent to John Smith",
    time: "9:10 AM",
    colour: "bg-blue-500",
  },
  {
    id: 3,
    icon: "👥",
    title: "New Customer",
    description: "Mary Jones was added",
    time: "8:50 AM",
    colour: "bg-purple-500",
  },
  {
    id: 4,
    icon: "📅",
    title: "Job Completed",
    description: "Fence Installation completed",
    time: "8:30 AM",
    colour: "bg-amber-500",
  },
  {
    id: 5,
    icon: "🛠",
    title: "Service Updated",
    description: "Pressure Washing pricing changed",
    time: "Yesterday",
    colour: "bg-slate-500",
  },
];

export default function ActivityCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest business events
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
          📈
        </div>

      </div>

      {/* Activity Feed */}

      <div className="space-y-5">

        {recentActivity.map((activity) => (

          <div
            key={activity.id}
            className="flex gap-4"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${activity.colour}`}
              >
                {activity.icon}
              </div>

              {activity.id !== recentActivity.length && (
                <div className="mt-2 h-10 w-0.5 bg-slate-200" />
              )}

            </div>

            {/* Details */}

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <span className="text-xs text-slate-400">
                  {activity.time}
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {activity.description}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <button
        className="mt-6 w-full rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        View Activity Log
      </button>

    </div>
  );
}