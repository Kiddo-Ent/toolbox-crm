"use client";

import { useEffect, useState } from "react";

import { Service } from "@/types/service";
import { useServices } from "@/hooks/useServices";

import ServiceList from "./ServiceList";
import ServiceWorkspace from "./ServiceWorkspace";

export default function ServiceDashboard() {
  const {
  services,
  loading,
  error,
  saveService,
  removeService,
} = useServices();

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  useEffect(() => {
    if (
      services.length > 0 &&
      !selectedService
    ) {
      setSelectedService(services[0]);
    }
  }, [services, selectedService]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Service Catalogue...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen">

      <ServiceList
        services={services}
        selectedService={selectedService}
        onSelectService={setSelectedService}
      />

      {selectedService ? (
        <ServiceWorkspace
          service={selectedService}
          saveService={saveService}
          removeService={removeService}
/>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">
          No service selected.
        </div>
      )}

    </div>
  );
}