"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Customers",
    href: "/customers",
    icon: "👥",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    icon: "💼",
  },
  {
    label: "Quotes",
    href: "/quotes",
    icon: "📄",
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: "📅",
  },
  {
    label: "Invoices",
    href: "/invoices",
    icon: "💰",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold">
          ToolBox CRM
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Gary the Handyman
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5">

        {navigation.map((item) => {

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              <span>{item.label}</span>

            </Link>
          );
        })}

      </nav>

      {/* Settings */}

      <div className="border-t border-slate-800 p-3">

        <Link
          href="/settings"
          className={`mb-3 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            pathname === "/settings"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </Link>

        <div className="border-t border-slate-800 pt-4">

          <p className="text-sm font-medium">
            Gary Lock
          </p>

          <p className="text-xs text-slate-400">
            Administrator
          </p>

        </div>

      </div>

    </aside>
  );
}