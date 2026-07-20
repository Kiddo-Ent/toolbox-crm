"use client";

import { useMemo, useState } from "react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  property: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
}

export default function InvoiceWorkspace() {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Draft" | "Sent" | "Paid" | "Overdue"
  >("All");

  const invoices = useMemo<Invoice[]>(
    () => [

      {
        id: "1",
        invoiceNumber: "INV-1001",
        customer: "John Smith",
        property: "12 High Street",
        invoiceDate: "21 Jul 2026",
        dueDate: "04 Aug 2026",
        total: 325,
        status: "Paid",
      },

      {
        id: "2",
        invoiceNumber: "INV-1002",
        customer: "Mary Jones",
        property: "7 Church Road",
        invoiceDate: "22 Jul 2026",
        dueDate: "05 Aug 2026",
        total: 180,
        status: "Sent",
      },

      {
        id: "3",
        invoiceNumber: "INV-1003",
        customer: "Bob Brown",
        property: "88 Main Road",
        invoiceDate: "23 Jul 2026",
        dueDate: "06 Aug 2026",
        total: 895,
        status: "Draft",
      },

      {
        id: "4",
        invoiceNumber: "INV-1004",
        customer: "Peter Wilson",
        property: "44 Garden Avenue",
        invoiceDate: "16 Jul 2026",
        dueDate: "30 Jul 2026",
        total: 450,
        status: "Overdue",
      },

    ],
    []
  );

  const filteredInvoices = invoices.filter((invoice) => {

    const matchesSearch =
      invoice.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      invoice.invoiceNumber
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      invoice.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  function statusColour(status: Invoice["status"]) {

    switch (status) {

      case "Paid":
        return "bg-emerald-100 text-emerald-700";

      case "Draft":
        return "bg-slate-100 text-slate-700";

      case "Sent":
        return "bg-blue-100 text-blue-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";

    }

  }

  return (

    <div className="flex-1 overflow-y-auto bg-slate-50">

      <div className="mx-auto max-w-7xl space-y-6 p-6">

        {/* Header */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Invoices
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Invoice Management
              </h1>

              <p className="mt-2 text-slate-500">
                Create, manage and track customer invoices.
              </p>

            </div>

            <button
              className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              + New Invoice
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="grid gap-4 lg:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Customer or invoice number..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "All"
                      | "Draft"
                      | "Sent"
                      | "Paid"
                      | "Overdue"
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option>All</option>
                <option>Draft</option>
                <option>Sent</option>
                <option>Paid</option>
                <option>Overdue</option>
              </select>

            </div>

          </div>

        </div>

        {/* Invoice Table */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Invoice
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Property
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Due
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Total
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-200">
                                {filteredInvoices.length === 0 ? (

                  <tr>

                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No invoices found.
                    </td>

                  </tr>

                ) : (

                  filteredInvoices.map((invoice) => (

                    <tr
                      key={invoice.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div className="font-semibold text-slate-900">
                          {invoice.invoiceNumber}
                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <div className="font-medium text-slate-900">
                          {invoice.customer}
                        </div>

                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {invoice.property}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {invoice.invoiceDate}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {invoice.dueDate}
                      </td>

                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        $
                        {invoice.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColour(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
                          >
                            View
                          </button>

                          <button
                            className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Edit
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Summary */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-6">

            <p className="text-sm text-slate-500">
              Total Invoices
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {invoices.length}
            </h2>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">

            <p className="text-sm text-slate-500">
              Draft
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {
                invoices.filter(
                  (i) => i.status === "Draft"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">

            <p className="text-sm text-slate-500">
              Outstanding
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {
                invoices.filter(
                  (i) =>
                    i.status === "Sent" ||
                    i.status === "Overdue"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">

            <p className="text-sm text-slate-500">
              Paid
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              {
                invoices.filter(
                  (i) => i.status === "Paid"
                ).length
              }
            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}