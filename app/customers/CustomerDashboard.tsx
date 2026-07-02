"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";
import { useCustomers } from "@/hooks/useCustomers";

import DashboardLayout from "@/components/layout/DashboardLayout";

import CustomerList from "./CustomerList";
import CustomerWorkspace from "./CustomerWorkspace";

export default function CustomerDashboard() {
  const {
    customers,
    loading,
    error,
    saveCustomer,
    addCustomer,
    removeCustomer,
  } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    if (
      customers.length > 0 &&
      selectedCustomer === null
    ) {
      setSelectedCustomer(customers[0]);
    }
  }, [customers, selectedCustomer]);

  function createNewCustomer() {
    const newCustomer: Customer = {
      id: "",
      customer_number: 0,

      first_name: "",
      last_name: "",
      company_name: "",

      mobile_phone: "",
      home_phone: "",
      email: "",

      address_line_1: "",
      address_line_2: "",

      suburb: "",
      state: "",
      postcode: "",

      notes: "",

      is_active: true,

      is_deleted: false,
      deleted_at: null,

      created_at: "",
      updated_at: "",
    };

    setSelectedCustomer(newCustomer);
  }

  return (
    <DashboardLayout>

      {/* Page Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customers, contact details and notes.
          </p>

        </div>

        <button
          onClick={createNewCustomer}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + New Customer
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white p-12 text-center shadow">

          <p className="text-lg font-semibold text-slate-600">
            Loading customers...
          </p>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">

          {error}

        </div>

      )}

      {/* Main Layout */}

      {!loading && !error && (

        <div className="grid h-[calc(100vh-240px)] grid-cols-12 gap-6">

          {/* Customer List */}

          <div className="col-span-4">

            <CustomerList
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
            />

          </div>

          {/* Workspace */}

          <div className="col-span-8">

            {selectedCustomer ? (

              <CustomerWorkspace
                customer={selectedCustomer}
                saveCustomer={saveCustomer}
                addCustomer={addCustomer}
                removeCustomer={removeCustomer}
              />

            ) : (

              <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow">

                <div className="text-center">

                  <h2 className="text-2xl font-bold text-slate-700">
                    No Customer Selected
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Select a customer from the list or create a new one.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}