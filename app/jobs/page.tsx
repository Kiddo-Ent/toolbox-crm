import DashboardLayout from "@/components/layout/DashboardLayout";
import JobDashboard from "@/components/jobs/JobDashboard";

export const metadata = {
  title: "Jobs | ToolBox",
  description: "Manage jobs and field work",
};

export default function JobsPage() {
  return (
    <DashboardLayout>
      <JobDashboard />
    </DashboardLayout>
  );
}