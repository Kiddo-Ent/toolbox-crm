"use client";

interface CustomerToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewCustomer: () => void;
  totalCustomers: number;
}

export default function CustomerToolbar({
  search,
  onSearchChange,
  onNewCustomer,
  totalCustomers,
}: CustomerToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl bg-white shadow-sm">

      <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Customers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalCustomers} customer
            {totalCustomers === 1 ? "" : "s"} in your database
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
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 sm:w-80"
            />

          </div>

          {/* New Customer */}

          <button
            onClick={onNewCustomer}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Customer
          </button>

        </div>

      </div>

      {/* Bottom Toolbar */}

      <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          All Customers
        </button>

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          Active
        </button>

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          Inactive
        </button>

        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          Recent
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