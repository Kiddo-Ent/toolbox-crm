"use client";

import { useEffect, useState } from "react";

import { Opportunity } from "@/types/opportunity";
import { useOpportunities } from "@/hooks/useOpportunities";

import OpportunityStats from "./OpportunityStats";
import OpportunityToolbar from "./OpportunityToolbar";
import OpportunityList from "./OpportunityList";
import OpportunityWorkspace from "./OpportunityWorkspace";

export default function OpportunityDashboard() {
  const {
    opportunities,
    loading,
    error,
    saveOpportunity,
    addOpportunity,
    removeOpportunity,
    refresh,
  } = useOpportunities();

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (
      opportunities.length > 0 &&
      !selectedOpportunity
    ) {
      setSelectedOpportunity(opportunities[0]);
    }
  }, [opportunities, selectedOpportunity]);

  function createNewOpportunity() {
    const newOpportunity: Opportunity = {
      id: "",

      opportunity_number: 0,

      customer_id: "",
      property_id: "",

      title: "",

      description: null,

      status: "Lead",

      estimated_value: 0,

      expected_close_date: null,

      assigned_to: null,

      notes: null,

      is_deleted: false,
      deleted_at: null,

      created_at: "",
      updated_at: "",
    };

    setSelectedOpportunity(newOpportunity);
  }

  const filteredOpportunities =
    opportunities.filter((opportunity) => {

      const searchText =
        search.toLowerCase();

      return (
        opportunity.title
          .toLowerCase()
          .includes(searchText) ||

        opportunity.status
          .toLowerCase()
          .includes(searchText) ||

        String(
          opportunity.opportunity_number
        ).includes(searchText)
      );

    });

  return (

    <div className="space-y-6">

      {/* Statistics */}

      <OpportunityStats />

      {/* Toolbar */}

      <OpportunityToolbar
        search={search}
        onSearchChange={setSearch}
        onNewOpportunity={createNewOpportunity}
        totalOpportunities={
          opportunities.length
        }
      />

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white shadow-sm p-12 text-center">

          <h2 className="text-xl font-semibold">

            Loading Opportunities...

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

        <div className="grid grid-cols-12 gap-6 h-[70vh]">

          {/* List */}

          <div className="col-span-4">

            <OpportunityList
              opportunities={
                filteredOpportunities
              }
              selectedOpportunity={
                selectedOpportunity
              }
              onSelectOpportunity={
                setSelectedOpportunity
              }
            />

          </div>

          {/* Workspace */}

          <div className="col-span-8">

            {selectedOpportunity ? (

              <OpportunityWorkspace
                opportunity={
                  selectedOpportunity
                }
                saveOpportunity={
                  saveOpportunity
                }
                addOpportunity={
                  addOpportunity
                }
                removeOpportunity={
                  removeOpportunity
                }
              />

            ) : (

              <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow-sm">

                <div className="text-center">

                  <h2 className="text-2xl font-bold text-slate-700">

                    No Opportunity Selected

                  </h2>

                  <p className="mt-3 text-slate-500">

                    Select an opportunity from the list
                    or create a new one.

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