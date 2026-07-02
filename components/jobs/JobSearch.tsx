"use client";

interface JobSearchProps {
  search: string;
  onSearchChange: (value: string) => void;

  activeOnly?: boolean;
  onActiveOnlyChange?: (value: boolean) => void;

  totalResults?: number;
}

export default function JobSearch({
  search,
  onSearchChange,
  activeOnly = false,
  onActiveOnlyChange,
  totalResults,
}: JobSearchProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">

      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="flex-1">

          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Search Jobs
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search by job number, title, technician or status..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Options */}

        <div className="flex items-center gap-6">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) =>
                onActiveOnlyChange?.(
                  e.target.checked
                )
              }
              className="h-5 w-5 rounded border-slate-300 text-blue-600"
            />

            <span className="text-sm font-medium text-slate-700">
              Active Jobs
            </span>

          </label>

          {typeof totalResults === "number" && (

            <div className="rounded-xl bg-slate-100 px-4 py-3">

              <p className="text-sm text-slate-500">
                Results
              </p>

              <p className="text-xl font-bold text-slate-800">
                {totalResults}
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Status Filters */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex flex-wrap gap-3">

          {[
            "All",
            "Scheduled",
            "Assigned",
            "In Progress",
            "Waiting Parts",
            "Completed",
            "Invoiced",
            "Closed",
          ].map((status) => (

            <button
              key={status}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              {status}
            </button>

          ))}

        </div>

      </div>

      <div className="border-t border-slate-200 bg-white px-6 py-3">

        <p className="text-sm text-slate-500">
          Search by job number, title, technician, customer, property or status.
        </p>

      </div>

    </div>
  );
}