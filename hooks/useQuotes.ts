"use client";

import { useEffect, useState } from "react";

import { Quote } from "@/types/quote";

import {
  getQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from "@/repositories/quoteRepository";

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getQuotes();

      setQuotes(data);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Unable to load quotes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveQuote(
    quote: Quote
  ) {
    await updateQuote(quote);
    await refresh();
  }

  async function addQuote(
    quote: Omit<
      Quote,
      "id" | "created_at" | "updated_at"
    >
  ) {
    await createQuote(quote);
    await refresh();
  }

  async function removeQuote(
    id: string
  ) {
    await deleteQuote(id);
    await refresh();
  }

  return {
    quotes,
    loading,
    error,

    refresh,

    saveQuote,
    addQuote,
    removeQuote,
  };
}