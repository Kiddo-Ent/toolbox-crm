"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/repositories/customerRepository";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getCustomers();

      setCustomers(data);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveCustomer(customer: Customer) {
    await updateCustomer(customer);
    await refresh();
  }

  async function addCustomer(
    customer: Omit<Customer, "id" | "created_at" | "updated_at">
  ) {
    await createCustomer(customer);
    await refresh();
  }

  async function removeCustomer(id: string) {
    await deleteCustomer(id);
    await refresh();
  }

  return {
    customers,
    loading,
    error,

    refresh,

    saveCustomer,
    addCustomer,
    removeCustomer,
  };
}