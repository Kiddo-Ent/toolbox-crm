"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import KPIGrid from "./KPIGrid";
import ScheduleCard from "./ScheduleCard";
import ActivityCard from "./ActivityCard";
import QuickActions from "./QuickActions";
import RevenueCard from "./RevenueCard";
import PipelineCard from "./PipelineCard";
import BusinessHealth from "./BusinessHealth";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Page Header */}

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Welcome to ToolBox. Here's an overview of your business today.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="mb-8">
        <KPIGrid />
      </div>

      {/* Schedule & Activity */}

      <div className="mb-8 grid gap-6 xl:grid-cols-2">

        <ScheduleCard />

        <ActivityCard />

      </div>

      {/* Quick Actions / Pipeline / Health */}

      <div className="mb-8 grid gap-6 xl:grid-cols-3">

        <QuickActions />

        <PipelineCard />

        <BusinessHealth />

      </div>

      {/* Revenue */}

      <RevenueCard />

    </DashboardLayout>
  );
}