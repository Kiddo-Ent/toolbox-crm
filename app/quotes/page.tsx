import DashboardLayout from "@/components/layout/DashboardLayout";
import QuoteDashboard from "@/components/quotes/QuoteDashboard";

export const metadata = {
  title: "Quotes | ToolBox",
  description: "Manage customer quotes",
};

export default function QuotesPage() {
  return (
    <DashboardLayout>
      <QuoteDashboard />
    </DashboardLayout>
  );
}