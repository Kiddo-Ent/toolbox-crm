"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";

interface CustomerWorkspaceProps {
  customer: Customer;

  saveCustomer: (
    customer: Customer
  ) => Promise<void>;

  addCustomer: (
    customer: Omit<
      Customer,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeCustomer: (
    id: string
  ) => Promise<void>;
}

export default function CustomerWorkspace({
  customer,
  saveCustomer,
  addCustomer,
  removeCustomer,
}: CustomerWorkspaceProps) {

  const [editedCustomer, setEditedCustomer] =
    useState<Customer>(customer);

  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const isNewCustomer =
    editedCustomer.id === "";

  function updateField<
    K extends keyof Customer
  >(
    field: K,
    value: Customer[K]
  ) {
    setEditedCustomer((current) => ({
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

              {isNewCustomer
                ? "New Customer"
                : `${editedCustomer.first_name} ${editedCustomer.last_name}`}

            </h1>

            <p className="mt-2 text-slate-500">

              {isNewCustomer
                ? "Create a new customer record."
                : `Customer #${editedCustomer.customer_number}`}

            </p>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              editedCustomer.is_active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {editedCustomer.is_active
              ? "Active"
              : "Inactive"}
          </span>

        </div>

      </div>

      <div className="p-8">

        {/* ====================================== */}
        {/* Personal Details */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Personal Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                First Name
              </label>

              <input
                value={editedCustomer.first_name}
                onChange={(e) =>
                  updateField(
                    "first_name",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Last Name
              </label>

              <input
                value={editedCustomer.last_name}
                onChange={(e) =>
                  updateField(
                    "last_name",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Company Name
              </label>

              <input
                value={editedCustomer.company_name ?? ""}
                onChange={(e) =>
                  updateField(
                    "company_name",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Contact Details */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Contact Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Mobile Phone
              </label>

              <input
                value={editedCustomer.mobile_phone ?? ""}
                onChange={(e) =>
                  updateField(
                    "mobile_phone",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Home Phone
              </label>

              <input
                value={editedCustomer.home_phone ?? ""}
                onChange={(e) =>
                  updateField(
                    "home_phone",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <input
                type="email"
                value={editedCustomer.email ?? ""}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Address */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Address
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Address Line 1
              </label>

              <input
                value={editedCustomer.address_line_1 ?? ""}
                onChange={(e) =>
                  updateField(
                    "address_line_1",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Address Line 2
              </label>

              <input
                value={editedCustomer.address_line_2 ?? ""}
                onChange={(e) =>
                  updateField(
                    "address_line_2",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Suburb
              </label>

              <input
                value={editedCustomer.suburb ?? ""}
                onChange={(e) =>
                  updateField(
                    "suburb",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                State
              </label>

              <input
                value={editedCustomer.state ?? ""}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Postcode
              </label>

              <input
                value={editedCustomer.postcode ?? ""}
                onChange={(e) =>
                  updateField(
                    "postcode",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Notes */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Customer Notes
          </h2>

          <textarea
            rows={8}
            value={editedCustomer.notes ?? ""}
            onChange={(e) =>
              updateField(
                "notes",
                e.target.value || null
              )
            }
            placeholder="Enter any notes about this customer..."
            className="w-full resize-none rounded-lg border px-4 py-3"
          />

        </div>

        {/* ====================================== */}
        {/* Customer Summary */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">

          <h2 className="mb-6 text-xl font-bold">
            Customer Summary
          </h2>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            <div>

              <p className="text-sm text-slate-500">
                Customer No
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedCustomer.customer_number || "New"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-2 text-xl font-bold text-slate-800">
                {editedCustomer.is_active
                  ? "Active"
                  : "Inactive"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="mt-2 font-semibold text-slate-700 break-all">
                {editedCustomer.email || "-"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Mobile
              </p>

              <p className="mt-2 font-semibold text-slate-700">
                {editedCustomer.mobile_phone || "-"}
              </p>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Customer Status */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Customer Status
          </h2>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-slate-800">
                Active Customer
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Inactive customers remain in the database but
                will no longer appear in normal searches.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "is_active",
                  !editedCustomer.is_active
                )
              }
              className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
                editedCustomer.is_active
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-slate-500 hover:bg-slate-600"
              }`}
            >
              {editedCustomer.is_active
                ? "Active"
                : "Inactive"}
            </button>

          </div>

        </div>
                {/* ====================================== */}
        {/* Related Records */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Related Records
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Properties */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                🏡
              </div>

              <h3 className="font-semibold text-slate-800">
                Properties
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                View all properties owned by this customer.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                View Properties
              </button>

            </div>

            {/* Opportunities */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                💼
              </div>

              <h3 className="font-semibold text-slate-800">
                Opportunities
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Review current and previous sales opportunities.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
              >
                View Opportunities
              </button>

            </div>

            {/* Quotes */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                📄
              </div>

              <h3 className="font-semibold text-slate-800">
                Quotes
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                View quotations created for this customer.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
              >
                View Quotes
              </button>

            </div>

            {/* Jobs */}

            <div className="rounded-xl border border-slate-200 p-6">

              <div className="mb-4 text-4xl">
                🛠️
              </div>

              <h3 className="font-semibold text-slate-800">
                Jobs
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Review completed and scheduled jobs.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                View Jobs
              </button>

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* Activity Timeline */}
        {/* ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <div className="flex items-start gap-4">

              <div className="mt-1 text-2xl">
                👤
              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  Customer record created
                </p>

                <p className="text-sm text-slate-500">
                  This timeline will automatically display customer activity.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="mt-1 text-2xl">
                📄
              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  Future quote activity
                </p>

                <p className="text-sm text-slate-500">
                  Quotes, emails and approvals will appear here.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="mt-1 text-2xl">
                🛠️
              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  Future job activity
                </p>

                <p className="text-sm text-slate-500">
                  Scheduled jobs, completions and invoices will appear here.
                </p>

              </div>

            </div>

          </div>

        </div>
                {/* ====================================== */}
        {/* Customer Actions */}
        {/* ====================================== */}

        <div className="mb-10 rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                Customer Actions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Save, contact or remove this customer.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {/* Save */}

              <button
                onClick={async () => {

                  try {

                    if (isNewCustomer) {

                      const {
                        id,
                        created_at,
                        updated_at,
                        ...newCustomer
                      } = editedCustomer;

                      await addCustomer(newCustomer);

                      alert("✅ Customer created successfully.");

                    } else {

                      await saveCustomer(
                        editedCustomer
                      );

                      alert("✅ Customer saved successfully.");

                    }

                  } catch (err) {

                    console.error(err);

                    alert("Unable to save customer.");

                  }

                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                💾 Save Customer
              </button>

              {/* Email */}

              <button
                type="button"
                onClick={() => {

                  if (!editedCustomer.email) {

                    alert("No email address recorded.");

                    return;

                  }

                  window.location.href =
                    `mailto:${editedCustomer.email}`;

                }}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📧 Email
              </button>

              {/* Phone */}

              <button
                type="button"
                onClick={() => {

                  if (!editedCustomer.mobile_phone) {

                    alert("No mobile number recorded.");

                    return;

                  }

                  window.location.href =
                    `tel:${editedCustomer.mobile_phone}`;

                }}
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                📞 Call
              </button>

              {/* Export */}

              <button
                type="button"
                onClick={() => {

                  console.log(
                    "Export Customer",
                    editedCustomer
                  );

                  alert(
                    "Customer export coming soon."
                  );

                }}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                📄 Export
              </button>

              {/* Delete */}

              {!isNewCustomer && (

                <button
                  onClick={async () => {

                    const confirmed = confirm(
                      `Delete ${editedCustomer.first_name} ${editedCustomer.last_name}?`
                    );

                    if (!confirmed) return;

                    try {

                      await removeCustomer(
                        editedCustomer.id
                      );

                      alert(
                        "Customer deleted."
                      );

                    } catch (err) {

                      console.error(err);

                      alert(
                        "Unable to delete customer."
                      );

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