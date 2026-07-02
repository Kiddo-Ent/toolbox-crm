"use client";

import { useMemo, useState } from "react";

import { Customer } from "@/types/customer";

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}

export default function CustomerList({
  customers,
  selectedCustomer,
  onSelectCustomer,
}: CustomerListProps) {

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {

    const text = search.toLowerCase().trim();

    return customers.filter((customer) => {

      const fullName =
        `${customer.first_name} ${customer.last_name}`.toLowerCase();

      return (

        fullName.includes(text) ||

        (customer.company_name ?? "")
          .toLowerCase()
          .includes(text) ||

        (customer.email ?? "")
          .toLowerCase()
          .includes(text) ||

        (customer.mobile_phone ?? "")
          .toLowerCase()
          .includes(text)

      );

    });

  }, [customers, search]);

  return (

    <div className="flex w-96 flex-col border-r bg-white">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Customers
        </h2>

        <input
          type="text"
          placeholder="Search Customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Customer List */}

      <div className="flex-1 overflow-y-auto">

        {filteredCustomers.length === 0 && (

          <div className="p-10 text-center text-slate-500">
            No customers found.
          </div>

        )}

        {filteredCustomers.map((customer) => {

          const fullName =
            `${customer.first_name} ${customer.last_name}`.trim();

          return (

            <button
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className={`w-full border-b p-5 text-left transition ${
                selectedCustomer?.id === customer.id
                  ? "border-l-4 border-blue-600 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >

              <div className="flex justify-between">

                <div>

                  <p className="font-bold">
                    {fullName || "New Customer"}
                  </p>

                  {customer.company_name && (

                    <p className="text-sm text-blue-600">
                      {customer.company_name}
                    </p>

                  )}

                  <p className="mt-2 text-sm text-slate-500">
                    📱 {customer.mobile_phone || "-"}
                  </p>

                  <p className="text-sm text-slate-500">
                    ✉️ {customer.email || "-"}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {customer.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <p className="mt-3 text-xs text-slate-400">
                    C-{customer.customer_number}
                  </p>

                </div>

              </div>

            </button>

          );

        })}

      </div>

    </div>

  );

}