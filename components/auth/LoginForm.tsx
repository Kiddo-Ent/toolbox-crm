"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >

      {/* Heading */}

      <div className="text-center">

        <h2 className="text-3xl font-bold text-slate-800">
          Sign In
        </h2>

        <p className="mt-2 text-slate-500">
          Sign in to your ToolBox account
        </p>

      </div>

      {/* Error */}

      {error && (

        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}

        </div>

      )}

      {/* Email */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Email Address

        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Password

        </label>

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              pr-12
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
              hover:text-slate-700
            "
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

      </div>
            {/* Remember Me */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-slate-600">

          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(e.target.checked)
            }
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          Remember me

        </label>

        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          Forgot Password?
        </Link>

      </div>

      {/* Sign In Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >

        {loading ? (

          <>

            <Loader2
              size={20}
              className="mr-2 animate-spin"
            />

            Signing In...

          </>

        ) : (

          "Sign In"

        )}

      </button>

      {/* Divider */}

      <div className="relative py-2">

        <div className="absolute inset-0 flex items-center">

          <div className="w-full border-t border-slate-200" />

        </div>

        <div className="relative flex justify-center">

          <span className="bg-white px-4 text-xs uppercase tracking-wider text-slate-400">

            Secure Login

          </span>

        </div>

      </div>

      {/* Information */}

      <div className="rounded-xl bg-slate-50 p-4">

        <h3 className="font-semibold text-slate-700">
          Welcome to ToolBox
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Securely manage customers,
          properties, quotes, jobs and
          your entire business from one
          place.
        </p>

      </div>

      {/* Footer */}

      <div className="text-center">

        <p className="text-xs text-slate-500">
          ToolBox CRM
        </p>

        <p className="mt-1 text-xs text-slate-400">
          © {new Date().getFullYear()} ToolBox.
          All rights reserved.
        </p>

      </div>
          </form>
  );
}