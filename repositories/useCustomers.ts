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
    }

    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveCustomer(customer: Customer) {
    try {
      await updateCustomer(customer);
      await refresh();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function addCustomer(
    customer: Omit<Customer, "id" | "created_at" | "updated_at">
  ) {
    try {
      await createCustomer(customer);
      await refresh();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function removeCustomer(id: string) {
    try {
      await deleteCustomer(id);
      await refresh();
    } catch (err) {
      console.error(err);
      throw err;
    }
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