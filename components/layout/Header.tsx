"use client";

import { useMemo } from "react";

export default function Header() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";

    return "Good Evening";
  }, []);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">

      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            {greeting}, Gary 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {today}
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden lg:block">

            <input
              type="text"
              placeholder="Search customers, quotes, jobs..."
              className="w-96 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          {/* Notifications */}

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
            title="Notifications"
          >
            🔔
          </button>

          {/* Settings */}

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
            title="Settings"
          >
            ⚙️
          </button>

          {/* Profile */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              G
            </div>

            <div>

              <p className="font-semibold text-slate-800">
                Gary Lock
              </p>

              <p className="text-sm text-slate-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}