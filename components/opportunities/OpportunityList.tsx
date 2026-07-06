"use client";

import { useMemo, useState } from "react";

import { Opportunity } from "@/types/opportunity";

import OpportunityCard from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
  onSelectOpportunity: (
    opportunity: Opportunity
  ) => void;
}

export default function OpportunityList({
  opportunities,
  selectedOpportunity,
  onSelectOpportunity,
}: OpportunityListProps) {
  const [search, setSearch] = useState("");

  const filteredOpportunities = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return opportunities;

    return opportunities.filter((opportunity) => {
      return (
        opportunity.title
          .toLowerCase()
          .includes(text) ||

        opportunity.opportunity_status
          .toLowerCase()
          .includes(text) ||

        (opportunity.description ?? "")
          .toLowerCase()
          .includes(text) ||

        String(
          opportunity.opportunity_number
        ).includes(text)
      );
    });
  }, [opportunities, search]);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Opportunities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredOpportunities.length} of{" "}
          {opportunities.length} opportunities
        </p>

        <input
          type="text"
          placeholder="Search opportunities..."
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

      {/* List */}

      <div className="flex-1 overflow-y-auto p-4">

        {filteredOpportunities.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                💼
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Opportunities Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Website enquiries and sales opportunities will appear here.
              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredOpportunities.map(
              (opportunity) => (

                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  selected={
                    selectedOpportunity?.id ===
                    opportunity.id
                  }
                  onClick={() =>
                    onSelectOpportunity(
                      opportunity
                    )
                  }
                />

              )
            )}

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            {filteredOpportunities.length} displayed
          </span>

          <span className="text-sm font-medium text-slate-600">
            Total: {opportunities.length}
          </span>

        </div>

      </div>

    </div>
  );
}