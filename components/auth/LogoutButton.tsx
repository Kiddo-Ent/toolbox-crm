"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogOut, Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        font-medium
        text-red-600
        transition
        hover:bg-red-50
        disabled:opacity-60
      "
    >
      {loading ? (
        <>
          <Loader2
            size={16}
            className="animate-spin"
          />
          Signing Out...
        </>
      ) : (
        <>
          <LogOut size={16} />
          Sign Out
        </>
      )}
    </button>
  );
}