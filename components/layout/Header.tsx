"use client";

import { useEffect, useState } from "react";
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

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

      <div className="flex h-16 items-center justify-between px-8">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {greeting}, Gary 👋
          </h1>

          <p className="text-sm text-slate-500">
            Let's get some work done today.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <input
            type="text"
            placeholder="Search..."
            className="hidden w-80 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white lg:block"
          />

          {/* Notifications */}

          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-100">
            🔔
          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {userEmail
                ? userEmail.charAt(0).toUpperCase()
                : "G"}
            </div>

            <div className="hidden md:block">

              <p className="text-sm font-semibold text-slate-800">
                Gary Lock
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>

            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              {loading ? "..." : "Sign Out"}
            </button>

          </div>

        </div>

      </div>

    </header>
  );
}