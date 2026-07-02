import DashboardLayout from "@/components/layout/DashboardLayout";
import CustomerDashboard from "@/components/customers/CustomerDashboard";

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <CustomerDashboard />
    </DashboardLayout>
  );
}