"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";
import { useCustomers } from "@/hooks/useCustomers";

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
      !selectedCustomer
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

      company_name: null,

      mobile_phone: null,
      home_phone: null,
      email: null,

      address_line_1: null,
      address_line_2: null,

      suburb: null,
      state: null,
      postcode: null,

      notes: null,

      is_active: true,

      created_at: "",
      updated_at: "",

      is_deleted: false,
      deleted_at: null,
    };

    setSelectedCustomer(newCustomer);
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Customers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-600">
        {error}
      </div>
    );
  }
    console.log("Rendering customers:", customers);
  return (
    <div className="relative flex h-screen bg-gray-100">

      {/* Customer List */}

      <CustomerList
        customers={customers}
        selectedCustomer={selectedCustomer}
        onSelectCustomer={setSelectedCustomer}
      />

      {/* Workspace */}

      <div className="relative flex flex-1 flex-col">

        {/* Header */}

        <div className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Customers
            </h1>

            <p className="mt-1 text-slate-500">
              Manage customers and their contact details.
            </p>

          </div>

          <button
            onClick={createNewCustomer}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Customer
          </button>

        </div>

        {/* Workspace */}

        <div className="flex-1 overflow-hidden">

          {selectedCustomer ? (

            <CustomerWorkspace
              customer={selectedCustomer}
              saveCustomer={saveCustomer}
              addCustomer={addCustomer}
              removeCustomer={removeCustomer}
            />

          ) : (

            <div className="flex h-full items-center justify-center text-xl text-slate-500">
              No customer selected.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}