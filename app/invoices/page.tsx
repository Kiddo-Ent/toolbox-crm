import DashboardLayout from "@/components/layout/DashboardLayout";
import InvoiceWorkspace from "@/components/invoices/InvoiceWorkspace";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <InvoiceWorkspace />
    </DashboardLayout>
  );
}