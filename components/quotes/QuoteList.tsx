"use client";

import { useMemo, useState } from "react";

import { Quote } from "@/types/quote";

import QuoteCard from "./QuoteCard";

interface QuoteListProps {
  quotes: Quote[];
  selectedQuote: Quote | null;
  onSelectQuote: (
    quote: Quote
  ) => void;
}

export default function QuoteList({
  quotes,
  selectedQuote,
  onSelectQuote,
}: QuoteListProps) {
  const [search, setSearch] = useState("");

  const filteredQuotes = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return quotes;

    return quotes.filter((quote) => {

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

  }, [quotes, search]);

  return (

    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Quotes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredQuotes.length} of{" "}
          {quotes.length} quotes
        </p>

        {/* Search */}

        <input
          type="text"
          placeholder="Search quotes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* Quote List */}

      <div className="flex-1 overflow-y-auto p-4">

        {filteredQuotes.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                📄
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Quotes Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term.
              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredQuotes.map((quote) => (

              <QuoteCard
                key={quote.id}
                quote={quote}
                selected={
                  selectedQuote?.id ===
                  quote.id
                }
                onClick={() =>
                  onSelectQuote(
                    quote
                  )
                }
              />

            ))}

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">

            {filteredQuotes.length} displayed

          </span>

          <span className="text-sm font-medium text-slate-600">

            Total: {quotes.length}

          </span>

        </div>

      </div>

    </div>

  );

}