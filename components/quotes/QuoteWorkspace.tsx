"use client";

import { useEffect, useState } from "react";

import { Quote } from "@/types/quote";
import { QuoteItem } from "@/types/quoteItem";

import QuoteItemsGrid from "./QuoteItemsGrid";

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

  const [editedQuote, setEditedQuote] =
    useState<Quote>(quote);

  const [items, setItems] =
    useState<QuoteItem[]>([]);

  useEffect(() => {

    setEditedQuote(quote);

    // Existing quotes will later load their
    // items from Supabase.
    // New quotes begin with an empty list.

    setItems([]);

  }, [quote]);

  const isNewQuote =
    editedQuote.id === "";

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

    <div className="h-full overflow-y-auto rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="sticky top-0 z-10 border-b bg-white p-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              {isNewQuote
                ? "New Quote"
                : `Quote #${editedQuote.quote_number}`}

            </h1>

            <p className="mt-2 text-slate-500">

              Create, edit and manage customer quotations.

            </p>

          </div>

          <span
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold

              ${
                editedQuote.quote_status === "Accepted"
                  ? "bg-emerald-100 text-emerald-700"
                  : editedQuote.quote_status === "Sent"
                  ? "bg-blue-100 text-blue-700"
                  : editedQuote.quote_status === "Draft"
                  ? "bg-amber-100 text-amber-700"
                  : editedQuote.quote_status === "Declined"
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-700"
              }
            `}
          >

            {editedQuote.quote_status}

          </span>

        </div>

      </div>

      <div className="p-8">

        {/* ====================================== */}
        {/* Quote Details */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">

            Quote Details

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Quote Number */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Quote Number

              </label>

              <input
                value={editedQuote.quote_number}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3"
              />

            </div>

            {/* Version */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Version

              </label>

              <input
                value={editedQuote.version}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3"
              />

            </div>

            {/* Customer */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Customer ID

              </label>

              <input
                value={editedQuote.customer_id}
                onChange={(e) =>
                  updateField(
                    "customer_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Property */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Property ID

              </label>

              <input
                value={editedQuote.property_id}
                onChange={(e) =>
                  updateField(
                    "property_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Opportunity */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

                Opportunity ID

              </label>

              <input
                value={editedQuote.opportunity_id}
                onChange={(e) =>
                  updateField(
                    "opportunity_id",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-semibold">

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
                className="w-full rounded-lg border px-4 py-3"
              >

                <option>Draft</option>
                <option>Sent</option>
                <option>Accepted</option>
                <option>Declined</option>
                <option>Expired</option>

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
                className="w-full rounded-lg border px-4 py-3"
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
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Financial Summary */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Financial Summary
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Materials */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Materials
              </label>

              <input
                value={`$${editedQuote.materials_total.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Labour */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Labour
              </label>

              <input
                value={`$${editedQuote.labour_total.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* GST */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                GST
              </label>

              <input
                value={`$${editedQuote.gst.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Subtotal */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Subtotal
              </label>

              <input
                value={`$${editedQuote.subtotal.toFixed(2)}`}
                readOnly
                className="w-full rounded-lg border bg-slate-100 px-4 py-3 font-semibold"
              />

            </div>

            {/* Total */}

            <div className="lg:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Quote Total
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
        {/* Quote Summary */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">

          <h2 className="mb-6 text-xl font-bold">
            Quote Summary
          </h2>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedQuote.quote_status}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Version
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedQuote.version}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Issue Date
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedQuote.issue_date}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-600">
                ${editedQuote.total.toFixed(2)}
              </p>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Customer Notes */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
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
            className="w-full resize-none rounded-lg border px-4 py-3"
          />

        </div>

        {/* ====================================== */}
        {/* Internal Notes */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Internal Notes
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
            placeholder="Internal notes for office staff..."
            className="w-full resize-none rounded-lg border px-4 py-3"
          />

        </div>
                {/* ====================================== */}
        {/* Quote Items */}
        {/* ====================================== */}

        <div className="mb-6">

          <QuoteItemsGrid
            items={items}
            onItemsChange={(updatedItems) => {

              setItems(updatedItems);

              const materials = updatedItems
                .filter(
                  (i) => i.item_type === "Material"
                )
                .reduce(
                  (sum, i) => sum + i.line_total,
                  0
                );

              const labour = updatedItems
                .filter(
                  (i) => i.item_type !== "Material"
                )
                .reduce(
                  (sum, i) => sum + i.line_total,
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

              setEditedQuote((current) => ({
                ...current,

                materials_total:
                  materials,

                labour_total:
                  labour,

                subtotal,

                gst,

                total,
              }));

            }}

            onAddItem={async () => {

              const newItem: QuoteItem = {

                id: crypto.randomUUID(),

                quote_id:
                  editedQuote.id,

                line_number:
                  items.length + 1,

                item_type:
                  "Material",

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

              // TODO:
              // saveQuoteItem(item)

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

        {/* ====================================== */}
        {/* Related Records */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Related Records
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Customer */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                👤
              </div>

              <h3 className="font-semibold">
                Customer
              </h3>

              <p className="mt-2 text-sm text-slate-500">

                Linked customer record.

              </p>

            </div>

            {/* Property */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                🏡
              </div>

              <h3 className="font-semibold">
                Property
              </h3>

              <p className="mt-2 text-sm text-slate-500">

                Installation location.

              </p>

            </div>

            {/* Opportunity */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                💼
              </div>

              <h3 className="font-semibold">
                Opportunity
              </h3>

              <p className="mt-2 text-sm text-slate-500">

                Sales opportunity.

              </p>

            </div>

            {/* Future Job */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                🛠️
              </div>

              <h3 className="font-semibold">
                Future Job
              </h3>

              <p className="mt-2 text-sm text-slate-500">

                Created when quote is accepted.

              </p>

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Quote Actions */}
        {/* ====================================== */}

        <div className="rounded-2xl bg-white shadow-sm p-8 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                Quote Actions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Save changes, preview, email or convert this quote into a job.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
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

                      alert("✅ Quote created successfully.");

                    } else {

                      await saveQuote(editedQuote);

                      alert("✅ Quote saved successfully.");

                    }

                  } catch (err) {

                    console.error(err);

                    alert("Unable to save quote.");

                  }

                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                💾 Save Quote
              </button>

              {/* Preview */}

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                onClick={() => {
                  console.log("Preview PDF");
                }}
              >
                📄 Preview PDF
              </button>

              {/* Email */}

              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                onClick={() => {
                  console.log("Email Quote");
                }}
              >
                📧 Email Quote
              </button>

              {/* Convert */}

              <button
                type="button"
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                onClick={() => {
                  console.log("Convert Quote to Job");
                }}
              >
                🛠 Convert to Job
              </button>

              {/* Duplicate */}

              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                onClick={() => {
                  console.log("Duplicate Quote");
                }}
              >
                📋 Duplicate
              </button>

              {/* Delete */}

              {!isNewQuote && (

                <button
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

                      alert("Quote deleted.");

                    } catch (err) {

                      console.error(err);

                      alert("Unable to delete quote.");

                    }

                  }}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑 Delete
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}