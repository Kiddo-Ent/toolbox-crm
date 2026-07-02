"use client";

interface OpportunitySearchProps {
  search: string;
  onSearchChange: (value: string) => void;

  activeOnly?: boolean;
  onActiveOnlyChange?: (value: boolean) => void;

  totalResults?: number;
}

export default function OpportunitySearch({
  search,
  onSearchChange,
  activeOnly = false,
  onActiveOnlyChange,
  totalResults,
}: OpportunitySearchProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">

      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex-1">

          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Search Opportunities
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
              placeholder="Search by title, status, customer or property..."
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                py-3
                pl-12
                pr-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

        </div>

        {/* Right */}

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
              Active Opportunities
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

      {/* Quick Filters */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex flex-wrap gap-3">

          <button className="rounded-lg bg-white border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition">
            All
          </button>

          <button className="rounded-lg bg-blue-50 border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition">
            Leads
          </button>

          <button className="rounded-lg bg-cyan-50 border border-cyan-300 px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100 transition">
            Site Visit
          </button>

          <button className="rounded-lg bg-amber-50 border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 transition">
            Quoting
          </button>

          <button className="rounded-lg bg-indigo-50 border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition">
            Quote Sent
          </button>

          <button className="rounded-lg bg-purple-50 border border-purple-300 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition">
            Negotiating
          </button>

          <button className="rounded-lg bg-emerald-50 border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition">
            Won
          </button>

          <button className="rounded-lg bg-red-50 border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition">
            Lost
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-white px-6 py-3">

        <p className="text-sm text-slate-500">
          Search by opportunity title, opportunity number, customer, property, assigned staff member or pipeline stage.
        </p>

      </div>

    </div>
  );
}