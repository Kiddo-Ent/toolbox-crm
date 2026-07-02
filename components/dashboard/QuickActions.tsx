"use client";

import Link from "next/link";

interface Action {
  title: string;
  description: string;
  href: string;
  icon: string;
  colour: string;
}

const actions: Action[] = [
  {
    title: "New Customer",
    description: "Create a customer record",
    href: "/customers",
    icon: "👥",
    colour: "bg-blue-500",
  },
  {
    title: "New Property",
    description: "Add a property",
    href: "/properties",
    icon: "🏡",
    colour: "bg-emerald-500",
  },
  {
    title: "New Quote",
    description: "Create a quotation",
    href: "/quotes",
    icon: "📝",
    colour: "bg-amber-500",
  },
  {
    title: "New Job",
    description: "Schedule a job",
    href: "/jobs",
    icon: "📅",
    colour: "bg-purple-500",
  },
  {
    title: "New Invoice",
    description: "Create an invoice",
    href: "/invoices",
    icon: "💰",
    colour: "bg-rose-500",
  },
  {
    title: "Services",
    description: "Manage services",
    href: "/services",
    icon: "🛠",
    colour: "bg-cyan-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump straight into your most common tasks.
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          ⚡
        </div>

      </div>

      {/* Action Grid */}

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => (

          <Link
            key={action.title}
            href={action.href}
            className="group rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${action.colour}`}
            >
              {action.icon}
            </div>

            <h3 className="mt-4 font-semibold text-slate-800 group-hover:text-blue-600">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {action.description}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}