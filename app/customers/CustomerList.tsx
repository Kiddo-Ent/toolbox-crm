"use client";

import { useMemo, useState } from "react";

import { Customer } from "@/types/customer";

import CustomerCard from "./CustomerCard";

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
    const text = search.trim().toLowerCase();

    if (!text) return customers;

    return customers.filter((customer) => {
      const fullName =
        `${customer.first_name} ${customer.last_name}`.toLowerCase();

      return (
        fullName.includes(text) ||
        customer.company_name.toLowerCase().includes(text) ||
        customer.email.toLowerCase().includes(text) ||
        customer.mobile_phone.toLowerCase().includes(text) ||
        customer.suburb.toLowerCase().includes(text)
      );
    });
  }, [customers, search]);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Customers
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredCustomers.length} of {customers.length} customer
          {customers.length === 1 ? "" : "s"}
        </p>

        {/* Search */}

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* Customer Cards */}

      <div className="flex-1 overflow-y-auto p-4">

        {filteredCustomers.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                👥
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Customers Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term.
              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredCustomers.map((customer) => (

              <CustomerCard
                key={customer.id}
                customer={customer}
                selected={
                  selectedCustomer?.id === customer.id
                }
                onClick={() =>
                  onSelectCustomer(customer)
                }
              />

            ))}

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            {filteredCustomers.length} displayed
          </span>

          <span className="text-sm font-medium text-slate-600">
            Total: {customers.length}
          </span>

        </div>

      </div>

    </div>
  );
}