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
    label: "Properties",
    href: "/properties",
    icon: "🏡",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    icon: "💼",
  },
  {
    label: "Quotes",
    href: "/quotes",
    icon: "📝",
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: "📅",
  },
  {
    label: "Services",
    href: "/services",
    icon: "🛠",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-800 px-8 py-8">

        <h1 className="text-3xl font-black">
          ToolBox
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Business Management Suite
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {navigation.map((item) => {

          const active = pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >

              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.label}
              </span>

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm font-semibold">
            ToolBox Pro
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Built for Australian Trades & Services
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Version 1.0
          </p>

        </div>

      </div>

    </aside>
  );
}