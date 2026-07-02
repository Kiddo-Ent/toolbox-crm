"use client";

interface JobToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewJob: () => void;
  onRefresh: () => void;
  totalJobs: number;
}

export default function JobToolbar({
  search,
  onSearchChange,
  onNewJob,
  onRefresh,
  totalJobs,
}: JobToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl bg-white shadow-sm">

      {/* Top Row */}

      <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalJobs} job{totalJobs === 1 ? "" : "s"} available
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search jobs..."
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-11
                pr-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                sm:w-80
              "
            />

          </div>

          {/* New Job */}

          <button
            onClick={onNewJob}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Job
          </button>

        </div>

      </div>

      {/* Bottom Toolbar */}

      <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          All
        </button>

        <button className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
          Scheduled
        </button>

        <button className="rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100">
          Assigned
        </button>

        <button className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100">
          In Progress
        </button>

        <button className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-100">
          Waiting Parts
        </button>

        <button className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
          Completed
        </button>

        <button className="rounded-lg border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-100">
          Invoiced
        </button>

        <button className="rounded-lg border border-slate-400 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
          Closed
        </button>

        <div className="ml-auto flex gap-3">

          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Export
          </button>

          <button
            onClick={onRefresh}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Refresh
          </button>

        </div>

      </div>

    </div>
  );
}