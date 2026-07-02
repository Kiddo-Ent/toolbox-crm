"use client";

interface ScheduleItem {
  id: number;
  time: string;
  customer: string;
  job: string;
  location: string;
  colour: string;
}

const todaySchedule: ScheduleItem[] = [
  {
    id: 1,
    time: "8:00 AM",
    customer: "John Smith",
    job: "Fence Repair",
    location: "Inverloch",
    colour: "bg-blue-500",
  },
  {
    id: 2,
    time: "10:30 AM",
    customer: "Mary Jones",
    job: "Pressure Washing",
    location: "Venus Bay",
    colour: "bg-emerald-500",
  },
  {
    id: 3,
    time: "2:00 PM",
    customer: "David Brown",
    job: "Security Camera Installation",
    location: "Cape Paterson",
    colour: "bg-amber-500",
  },
];

export default function ScheduleCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Today's Schedule
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {todaySchedule.length} scheduled jobs
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          📅
        </div>

      </div>

      {/* Schedule */}

      <div className="space-y-5">

        {todaySchedule.map((item) => (

          <div
            key={item.id}
            className="flex gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div
                className={`h-4 w-4 rounded-full ${item.colour}`}
              />

              <div className="mt-2 h-full w-0.5 bg-slate-200" />

            </div>

            {/* Details */}

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <p className="font-bold text-slate-800">
                  {item.job}
                </p>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.time}
                </span>

              </div>

              <p className="mt-2 text-slate-600">
                {item.customer}
              </p>

              <p className="text-sm text-slate-400">
                📍 {item.location}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <button
        className="mt-6 w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        View Full Schedule
      </button>

    </div>
  );
}