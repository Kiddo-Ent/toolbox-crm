import DashboardLayout from "@/components/layout/DashboardLayout";
import OpportunityDashboard from "@/components/opportunities/OpportunityDashboard";

export const metadata = {
  title: "Opportunities | ToolBox",
  description: "Manage sales opportunities",
};

export default function OpportunitiesPage() {
  return (
    <DashboardLayout>
      <OpportunityDashboard />
    </DashboardLayout>
  );
}