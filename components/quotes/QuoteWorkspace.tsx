"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCustomers } from "@/hooks/useCustomers";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useProperties } from "@/hooks/useProperties";

import { Quote } from "@/types/quote";
import { QuoteItem } from "@/types/quoteItem";

import QuoteItemsGrid from "./QuoteItemsGrid";
import QuoteTotalsCard from "@/components/common/QuoteTotalsCard";

interface QuoteWorkspaceProps {
  quote: Quote;

  saveQuote: (
    quote: Quote
  ) => Promise<void>;

  addQuote: (
    quote: Omit<
      Quote,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeQuote: (
    id: string
  ) => Promise<void>;
}

export default function QuoteWorkspace({
  quote,
  saveQuote,
  addQuote,
  removeQuote,
}: QuoteWorkspaceProps) {

  const { customers } = useCustomers();
  const { properties } = useProperties();
  const { opportunities } = useOpportunities();

  const searchParams = useSearchParams();

  const [editedQuote, setEditedQuote] =
    useState<Quote>(quote);

  const [items, setItems] =
    useState<QuoteItem[]>([]);

  const [customerSearch, setCustomerSearch] =
    useState("");

  const [showCustomers, setShowCustomers] =
    useState(false);

  useEffect(() => {

    const customerId =
      searchParams.get("customer");

    const opportunityId =
      searchParams.get("opportunity");

    const propertyId =
      searchParams.get("property");

    setEditedQuote({

      ...quote,

      customer_id:
        customerId ??
        quote.customer_id,

      opportunity_id:
        opportunityId ??
        quote.opportunity_id,

      property_id:
        propertyId ??
        quote.property_id,

    });

    if (customerId) {

      const customer =
        customers.find(
          (c) => c.id === customerId
        );

      if (customer) {

        setCustomerSearch(
          `${customer.first_name} ${customer.last_name}`
        );

      }

    }

    setItems([]);

  }, [quote, searchParams, customers]);

  const isNewQuote =
    editedQuote.id === "";

  const selectedCustomer =
    customers.find(
      (customer) =>
        customer.id === editedQuote.customer_id
    );

  const customerOpportunities =
    opportunities.filter(
      (o) =>
        o.customer_id ===
          editedQuote.customer_id &&
        !o.is_deleted
    );

  function updateField<
    K extends keyof Quote
  >(
    field: K,
    value: Quote[K]
  ) {

    setEditedQuote((current) => ({
      ...current,
      [field]: value,
    }));

  }

  return (

    <div className="flex-1 overflow-y-auto bg-slate-50">

      <div className="mx-auto max-w-7xl p-6 space-y-6">

        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Quote
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">

                {isNewQuote
                  ? "New Quote"
                  : `Quote #${editedQuote.quote_number}`}

              </h1>

              <p className="mt-2 text-sm text-slate-500">

                Version {editedQuote.version}

              </p>

            </div>

            <div className="w-full lg:w-64">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                value={editedQuote.quote_status}
                onChange={(e) =>
                  updateField(
                    "quote_status",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              >
                <option>Draft</option>
                <option>Sent</option>
                <option>Accepted</option>
                <option>Declined</option>
                <option>Expired</option>
              </select>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Quote Details */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Quote Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Customer */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Customer
              </label>

              <div className="relative">

                <input
                  type="text"
                  value={customerSearch}
                  placeholder="Search customer..."
                  onChange={(e) => {
                    setCustomerSearch(
                      e.target.value
                    );
                    setShowCustomers(true);
                  }}
                  onFocus={() =>
                    setShowCustomers(true)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
                                {showCustomers &&
                  customerSearch.length > 0 && (

                  <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">

                    {customers
                      .filter((customer) => {

                        const fullName =
                          `${customer.first_name} ${customer.last_name}`
                            .toLowerCase();

                        return fullName.includes(
                          customerSearch.toLowerCase()
                        );

                      })
                      .slice(0, 10)
                      .map((customer) => (

                        <button
                          key={customer.id}
                          type="button"
                          onClick={() => {

                            updateField(
                              "customer_id",
                              customer.id
                            );

                            updateField(
                              "property_id",
                              ""
                            );

                            updateField(
                              "opportunity_id",
                              ""
                            );

                            setCustomerSearch(
                              `${customer.first_name} ${customer.last_name}`
                            );

                            setShowCustomers(false);

                          }}
                          className="block w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50"
                        >

                          <div className="font-medium">
                            {customer.first_name}{" "}
                            {customer.last_name}
                          </div>

                          <div className="text-sm text-slate-500">
                            {customer.email}
                          </div>

                        </button>

                      ))}

                  </div>

                )}

              </div>

            </div>

            {/* Opportunity */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Opportunity
              </label>

              <select
                value={editedQuote.opportunity_id}
                onChange={(e) => {

                  updateField(
                    "opportunity_id",
                    e.target.value
                  );

                  const selectedOpportunity =
                    customerOpportunities.find(
                      (o) =>
                        o.id === e.target.value
                    );

                  if (selectedOpportunity) {

                    updateField(
                      "property_id",
                      selectedOpportunity.property_id
                    );

                  }

                }}
                disabled={!editedQuote.customer_id}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >

                <option value="">
                  {editedQuote.customer_id
                    ? "Select an opportunity..."
                    : "Select a customer first"}
                </option>

                {customerOpportunities.map(
                  (opportunity) => (

                    <option
                      key={opportunity.id}
                      value={opportunity.id}
                    >
                      {opportunity.title}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* Service Address */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Service Address
              </label>

              <select
                value={editedQuote.property_id}
                onChange={(e) =>
                  updateField(
                    "property_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >

                <option value="">
                  Select service address...
                </option>

                {properties
                  .filter(
                    (property) =>
                      property.customer_id ===
                      editedQuote.customer_id
                  )
                  .map((property) => (

                    <option
  key={property.id}
  value={property.id}
>
  {property.property_name} — {property.address_line_1}
</option>

                  ))}

              </select>

            </div>

            {/* Issue Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Issue Date
              </label>

              <input
                type="date"
                value={editedQuote.issue_date}
                onChange={(e) =>
                  updateField(
                    "issue_date",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Expiry Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Expiry Date
              </label>

              <input
                type="date"
                value={editedQuote.expiry_date}
                onChange={(e) =>
                  updateField(
                    "expiry_date",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Financial Summary */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Quote Totals
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Materials */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Materials
              </label>

              <input
                value={`$${editedQuote.materials_total.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Labour */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Labour
              </label>

              <input
                value={`$${editedQuote.labour_total.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* GST */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                GST
              </label>

              <input
                value={`$${editedQuote.gst.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Subtotal */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Subtotal
              </label>

              <input
                value={`$${editedQuote.subtotal.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Total */}

            <div className="lg:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Total Quote Value
              </label>

              <input
                value={`$${editedQuote.total.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-2xl font-bold text-emerald-700"
              />

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Customer Notes */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Customer Notes
          </h2>

          <textarea
            rows={6}
            value={editedQuote.customer_notes ?? ""}
            onChange={(e) =>
              updateField(
                "customer_notes",
                e.target.value
              )
            }
            placeholder="These notes will appear on the customer's quotation..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================== */}
        {/* Notes */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Notes
          </h2>

          <textarea
            rows={6}
            value={editedQuote.internal_notes ?? ""}
            onChange={(e) =>
              updateField(
                "internal_notes",
                e.target.value
              )
            }
            placeholder="Office notes that won't appear on the quote..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none"
          />

        </div>

        {/* ====================================== */}
        {/* Quote Items */}
        {/* ====================================== */}

        <div className="grid grid-cols-12 gap-6">

          {/* Items */}

          <div className="col-span-12 xl:col-span-9">

            <QuoteItemsGrid
              items={items}
              onItemsChange={(updatedItems) => {

                setItems(updatedItems);

                const materials =
                  updatedItems
                    .filter(
                      (i) =>
                        i.item_type === "Material"
                    )
                    .reduce(
                      (sum, i) =>
                        sum + i.line_total,
                      0
                    );

                const labour =
                  updatedItems
                    .filter(
                      (i) =>
                        i.item_type !== "Material"
                    )
                    .reduce(
                      (sum, i) =>
                        sum + i.line_total,
                      0
                    );

                const subtotal =
                  materials + labour;

                const gst =
                  updatedItems.reduce(
                    (sum, i) =>
                      sum +
                      i.line_total *
                        (i.gst_rate / 100),
                    0
                  );

                const total =
                  subtotal + gst;

                setEditedQuote(
                  (current) => ({
                    ...current,
                    materials_total:
                      materials,
                    labour_total:
                      labour,
                    subtotal,
                    gst,
                    total,
                  })
                );

              }}
                            onAddItem={async () => {

                const newItem: QuoteItem = {

                  id: crypto.randomUUID(),

                  quote_id: editedQuote.id,

                  line_number:
                    items.length + 1,

                  item_type: "Material",

                  description: "",

                  quantity: 1,

                  unit: "ea",

                  unit_price: 0,

                  discount: 0,

                  gst_rate: 10,

                  line_total: 0,

                  notes: null,

                  created_at: "",

                  updated_at: "",

                  is_deleted: false,

                  deleted_at: null,

                };

                setItems((current) => [
                  ...current,
                  newItem,
                ]);

              }}

              onSaveItem={async (item) => {

                console.log(
                  "Save Quote Item",
                  item
                );

              }}

              onDeleteItem={async (id) => {

                setItems((current) =>
                  current.filter(
                    (item) =>
                      item.id !== id
                  )
                );

              }}

            />

          </div>

          {/* Totals Card */}

          <div className="col-span-12 xl:col-span-3">

            <div className="sticky top-6">

              <QuoteTotalsCard
                quote={editedQuote}
              />

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Related Records */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Related Records
          </h2>

          <div className="space-y-3">

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-4 text-left transition hover:bg-slate-50"
            >

              <div>

                <p className="font-semibold">
                  Customer
                </p>

                <p className="text-sm text-slate-500">
                  View linked customer
                </p>

              </div>

              <span className="text-slate-400">
                →
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-4 text-left transition hover:bg-slate-50"
            >

              <div>

                <p className="font-semibold">
                  Service Address
                </p>

                <p className="text-sm text-slate-500">
                  View linked property
                </p>

              </div>

              <span className="text-slate-400">
                →
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-4 text-left transition hover:bg-slate-50"
            >

              <div>

                <p className="font-semibold">
                  Opportunity
                </p>

                <p className="text-sm text-slate-500">
                  View originating opportunity
                </p>

              </div>

              <span className="text-slate-400">
                →
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-4 text-left transition hover:bg-slate-50"
            >

              <div>

                <p className="font-semibold">
                  Invoices
                </p>

                <p className="text-sm text-slate-500">
                  Future invoices for this quote
                </p>

              </div>

              <span className="text-slate-400">
                →
              </span>

            </button>

          </div>

        </div>
                {/* ====================================== */}
        {/* Actions */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 mb-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Save your quote, preview the PDF, email it or delete it.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
                type="button"
                onClick={async () => {

                  try {

                    if (isNewQuote) {

                      const {
                        id,
                        created_at,
                        updated_at,
                        ...newQuote
                      } = editedQuote;

                      await addQuote(newQuote);

                      alert(
                        "✅ Quote created successfully."
                      );

                    } else {

                      await saveQuote(
                        editedQuote
                      );

                      alert(
                        "✅ Quote saved successfully."
                      );

                    }

                  } catch (err) {

                    console.error(err);

                    alert(
                      "Unable to save quote."
                    );

                  }

                }}
                className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition"
              >
                💾 Save Quote
              </button>

              {/* Preview */}

              <button
                type="button"
                onClick={() => {
                  console.log("Preview PDF");
                }}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                📄 Preview PDF
              </button>

              {/* Email */}

              <button
                type="button"
                onClick={() => {
                  console.log("Email Quote");
                }}
                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
              >
                📧 Email Quote
              </button>

              {/* Delete */}

              {!isNewQuote && (

                <button
                  type="button"
                  onClick={async () => {

                    if (
                      !confirm(
                        `Delete Quote #${editedQuote.quote_number}?`
                      )
                    ) {
                      return;
                    }

                    try {

                      await removeQuote(
                        editedQuote.id
                      );

                      alert(
                        "Quote deleted."
                      );

                    } catch (err) {

                      console.error(err);

                      alert(
                        "Unable to delete quote."
                      );

                    }

                  }}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition"
                >
                  🗑 Delete Quote
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}