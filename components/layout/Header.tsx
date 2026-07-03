"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function Header() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email ?? "");
      }
    }

    loadUser();
  }, []);

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

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">

      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            {greeting} 👋
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
          >
            🔔
          </button>

          {/* Settings */}

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
          >
            ⚙️
          </button>

          {/* User */}

          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {userEmail
                ? userEmail.charAt(0).toUpperCase()
                : "G"}
            </div>

            <div>

              <p className="font-semibold text-slate-800">
                {userEmail || "Loading..."}
              </p>

              <p className="text-sm text-slate-500">
                Administrator
              </p>

            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Signing Out..." : "Sign Out"}
            </button>

          </div>

        </div>

      </div>

    </header>
  );
}