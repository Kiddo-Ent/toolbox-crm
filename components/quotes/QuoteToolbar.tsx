"use client";

interface QuoteToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewQuote: () => void;
  onRefresh: () => void;
  totalQuotes: number;
}

export default function QuoteToolbar({
  search,
  onSearchChange,
  onNewQuote,
  onRefresh,
  totalQuotes,
}: QuoteToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl bg-white shadow-sm">

      {/* Top Row */}

      <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Quotes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalQuotes} quote
            {totalQuotes === 1 ? "" : "s"} available
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
              placeholder="Search quotes..."
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

          {/* New Quote */}

          <button
            onClick={onNewQuote}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Quote
          </button>

        </div>

      </div>

      {/* Bottom Toolbar */}

      <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          All
        </button>

        <button className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100">
          Draft
        </button>

        <button className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
          Sent
        </button>

        <button className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
          Accepted
        </button>

        <button className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100">
          Declined
        </button>

        <button className="rounded-lg border border-slate-400 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
          Expired
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