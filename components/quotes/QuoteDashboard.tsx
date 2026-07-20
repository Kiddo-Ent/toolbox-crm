"use client";

import { useEffect, useState } from "react";

import { Quote } from "@/types/quote";
import { useQuotes } from "@/hooks/useQuotes";
import { useSearchParams } from "next/navigation";
import QuoteStats from "./QuoteStats";
import QuoteToolbar from "./QuoteToolbar";
import QuoteList from "./QuoteList";
import QuoteWorkspace from "./QuoteWorkspace";

export default function QuoteDashboard() {
  const {
    quotes,
    loading,
    error,
    saveQuote,
    addQuote,
    removeQuote,
    refresh,
  } = useQuotes();

  const [selectedQuote, setSelectedQuote] =
    useState<Quote | null>(null);

  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

const quoteId = searchParams.get("quote");

  useEffect(() => {

  if (quotes.length === 0) {
    return;
  }

  if (quoteId) {

    const quote =
      quotes.find(
        (q) => q.id === quoteId
      );

    if (quote) {

      setSelectedQuote(quote);

      return;

    }

  }

  if (!selectedQuote) {

    setSelectedQuote(
      quotes[0]
    );

  }

}, [
  quotes,
  quoteId,
  selectedQuote,
]);

  function createNewQuote() {
    const today =
      new Date().toISOString().split("T")[0];

    const expiry =
      new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

    const newQuote: Quote = {
      id: "",

      quote_number: 0,

      version: 1,

      customer_id: "",

      property_id: "",

      opportunity_id: "",

      quote_status: "Draft",

      issue_date: today,

      expiry_date: expiry,

      materials_total: 0,

      labour_total: 0,

      subtotal: 0,

      gst: 0,

      total: 0,

      customer_notes: "",

      internal_notes: "",

      created_at: "",

      updated_at: "",

      is_deleted: false,

      deleted_at: null,
    };

    setSelectedQuote(newQuote);
  }

  const filteredQuotes =
    quotes.filter((quote) => {
      const text =
        search.toLowerCase();

      return (
        String(
          quote.quote_number
        ).includes(text) ||

        quote.quote_status
          .toLowerCase()
          .includes(text) ||

        (quote.customer_notes ?? "")
          .toLowerCase()
          .includes(text) ||

        (quote.internal_notes ?? "")
          .toLowerCase()
          .includes(text)
      );
    });

  return (

    <div className="space-y-6">

      {/* Statistics */}

      <QuoteStats
        quotes={quotes}
      />

      {/* Toolbar */}

      <QuoteToolbar
        search={search}
        onSearchChange={setSearch}
        onNewQuote={
          createNewQuote
        }
        onRefresh={refresh}
        totalQuotes={
          quotes.length
        }
      />

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white shadow-sm p-12 text-center">

          <h2 className="text-xl font-semibold">

            Loading Quotes...

          </h2>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">

          {error}

        </div>

      )}

      {/* Main Layout */}

      {!loading && !error && (

        <div className="grid grid-cols-12 gap-6 h-[75vh]">

          {/* Quote List */}

          <div className="col-span-4">

            <QuoteList
              quotes={
                filteredQuotes
              }
              selectedQuote={
                selectedQuote
              }
              onSelectQuote={
                setSelectedQuote
              }
            />

          </div>

          {/* Workspace */}

          <div className="col-span-8">

            {selectedQuote ? (

              <QuoteWorkspace
                quote={selectedQuote}
                saveQuote={
                  saveQuote
                }
                addQuote={
                  addQuote
                }
                removeQuote={
                  removeQuote
                }
              />

            ) : (

              <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow-sm">

                <div className="text-center">

                  <div className="text-6xl mb-6">
                    📄
                  </div>

                  <h2 className="text-2xl font-bold text-slate-700">

                    No Quote Selected

                  </h2>

                  <p className="mt-3 text-slate-500">

                    Select a quote from the list
                    or create a new quote.

                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}