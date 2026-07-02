"use client";

import { useEffect, useState } from "react";

import { Service } from "@/types/service";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/repositories/serviceRepository";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load services.");
    }

    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveService(service: Service) {
    await updateService(service);
    await refresh();
  }

  async function addService(
    service: Omit<Service, "id" | "created_at" | "updated_at">
  ) {
    await createService(service);
    await refresh();
  }

  async function removeService(id: number) {
    await deleteService(id);
    await refresh();
  }

  return {
    services,
    loading,
    error,

    refresh,

    saveService,
    addService,
    removeService,
  };
}