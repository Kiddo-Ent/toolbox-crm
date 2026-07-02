"use client";

import { useEffect, useState } from "react";

import { Opportunity } from "@/types/opportunity";

import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "@/repositories/opportunityRepository";

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getOpportunities();

      setOpportunities(data);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Unable to load opportunities.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveOpportunity(
    opportunity: Opportunity
  ) {
    await updateOpportunity(opportunity);
    await refresh();
  }

  async function addOpportunity(
    opportunity: Omit<
      Opportunity,
      "id" | "created_at" | "updated_at"
    >
  ) {
    await createOpportunity(opportunity);
    await refresh();
  }

  async function removeOpportunity(
    id: string
  ) {
    await deleteOpportunity(id);
    await refresh();
  }

  return {
    opportunities,
    loading,
    error,

    refresh,

    saveOpportunity,
    addOpportunity,
    removeOpportunity,
  };
}