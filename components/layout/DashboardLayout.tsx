"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Application */}

      <div className="ml-64 flex flex-1 flex-col">

        {/* Top Bar */}

        <Header />

        {/* Page */}

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}