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
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="ml-72 flex min-h-screen flex-col">

        {/* Header */}

        <Header />

        {/* Page Content */}

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
}