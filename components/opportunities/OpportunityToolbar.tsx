"use client";

interface OpportunityToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewOpportunity: () => void;
  totalOpportunities: number;
}

export default function OpportunityToolbar({
  search,
  onSearchChange,
  onNewOpportunity,
  totalOpportunities,
}: OpportunityToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl bg-white shadow-sm">

      {/* Top Row */}

      <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalOpportunities} opportunit
            {totalOpportunities === 1 ? "y" : "ies"} in your sales pipeline
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
              placeholder="Search opportunities..."
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

          {/* New Opportunity */}

          <button
            onClick={onNewOpportunity}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Opportunity
          </button>

        </div>

      </div>

      {/* Bottom Toolbar */}

      <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          All
        </button>

        <button className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
          Leads
        </button>

        <button className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100">
          Quoting
        </button>

        <button className="rounded-lg border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-100">
          Quote Sent
        </button>

        <button className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100">
          Won
        </button>

        <button className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100">
          Lost
        </button>

        <div className="ml-auto flex gap-3">

          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
            Export
          </button>

          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
            Refresh
          </button>

        </div>

      </div>

    </div>
  );
}