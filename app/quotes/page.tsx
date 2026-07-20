import { Suspense } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import QuoteDashboard from "@/components/quotes/QuoteDashboard";

export const metadata = {
  title: "Quotes | ToolBox",
  description: "Manage customer quotes",
};

export default function QuotesPage() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center p-10 text-slate-500">
            Loading Quotes...
          </div>
        }
      >
        <QuoteDashboard />
      </Suspense>
    </DashboardLayout>
  );
}