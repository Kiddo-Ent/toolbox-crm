"use client";

import { useEffect, useState } from "react";

import { Property } from "@/types/property";

import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/repositories/propertyRepository";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getProperties();

      setProperties(data);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Unable to load properties.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveProperty(property: Property) {
    await updateProperty(property);
    await refresh();
  }

  async function addProperty(
    property: Omit<
      Property,
      "id" | "created_at" | "updated_at"
    >
  ) {
    await createProperty(property);
    await refresh();
  }

  async function removeProperty(id: string) {
    await deleteProperty(id);
    await refresh();
  }

  return {
    properties,
    loading,
    error,

    refresh,

    saveProperty,
    addProperty,
    removeProperty,
  };
}