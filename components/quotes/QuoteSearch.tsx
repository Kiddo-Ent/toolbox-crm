"use client";

interface QuoteSearchProps {
  search: string;
  onSearchChange: (value: string) => void;

  activeOnly?: boolean;
  onActiveOnlyChange?: (value: boolean) => void;

  totalResults?: number;
}

export default function QuoteSearch({
  search,
  onSearchChange,
  activeOnly = false,
  onActiveOnlyChange,
  totalResults,
}: QuoteSearchProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">

      {/* Search Area */}

      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex-1">

          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Search Quotes
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
              placeholder="Search by quote number, customer, property or status..."
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
              Active Quotes
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

          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 transition">
            All
          </button>

          <button className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 transition">
            Draft
          </button>

          <button className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition">
            Sent
          </button>

          <button className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition">
            Accepted
          </button>

          <button className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition">
            Declined
          </button>

          <button className="rounded-lg border border-slate-400 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition">
            Expired
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-white px-6 py-3">

        <p className="text-sm text-slate-500">
          Search by quote number, status, customer, property, opportunity, notes or issue date.
        </p>

      </div>

    </div>
  );
}