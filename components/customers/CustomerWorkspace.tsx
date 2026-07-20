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

    <div className="h-full overflow-y-auto rounded-xl bg-white">

      {/* Header */}

      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              {isNewCustomer
                ? "New Customer"
                : `${editedCustomer.first_name} ${editedCustomer.last_name}`}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {isNewCustomer
                ? "Create a new customer."
                : `Customer #${editedCustomer.customer_number}`}

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
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              editedCustomer.is_active
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {editedCustomer.is_active
              ? "● Active"
              : "○ Inactive"}
          </button>

        </div>

      </div>

      <div className="space-y-6 p-6">

        {/* Customer Details */}

        <section className="rounded-xl border border-slate-200 bg-white p-6">

          <h3 className="mb-6 text-lg font-semibold text-slate-800">
            Customer Details
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Company
              </label>

              <input
                value={editedCustomer.company_name ?? ""}
                onChange={(e) =>
                  updateField(
                    "company_name",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mobile
              </label>

              <input
                value={editedCustomer.mobile_phone ?? ""}
                onChange={(e) =>
                  updateField(
                    "mobile_phone",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Home
              </label>

              <input
                value={editedCustomer.home_phone ?? ""}
                onChange={(e) =>
                  updateField(
                    "home_phone",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>
                        <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Street Address
              </label>

              <input
                value={editedCustomer.address_line_1 ?? ""}
                onChange={(e) =>
                  updateField(
                    "address_line_1",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Unit / Suite
              </label>

              <input
                value={editedCustomer.address_line_2 ?? ""}
                onChange={(e) =>
                  updateField(
                    "address_line_2",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                State
              </label>

              <select
                value={editedCustomer.state ?? ""}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value || null
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select State</option>
                <option value="VIC">Victoria</option>
                <option value="NSW">New South Wales</option>
                <option value="QLD">Queensland</option>
                <option value="SA">South Australia</option>
                <option value="WA">Western Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="ACT">Australian Capital Territory</option>
                <option value="NT">Northern Territory</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

          </div>

        </section>

        {/* Customer Notes */}

        <section className="rounded-xl border border-slate-200 bg-white p-6">

          <h3 className="mb-6 text-lg font-semibold text-slate-800">
            Notes
          </h3>

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
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

        </section>

        {/* Related Records */}

        <section className="rounded-xl border border-slate-200 bg-white p-6">

          <h3 className="mb-6 text-lg font-semibold text-slate-800">
            Related Records
          </h3>

          <div className="divide-y divide-slate-200">

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left transition hover:bg-slate-50"
            >
              <div>

                <p className="font-medium text-slate-800">
                  Service Addresses
                </p>

                <p className="text-sm text-slate-500">
                  Manage additional service locations.
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                0
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left transition hover:bg-slate-50"
            >
              <div>

                <p className="font-medium text-slate-800">
                  Opportunities
                </p>

                <p className="text-sm text-slate-500">
                  View sales opportunities.
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                0
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left transition hover:bg-slate-50"
            >
              <div>

                <p className="font-medium text-slate-800">
                  Quotes
                </p>

                <p className="text-sm text-slate-500">
                  View customer quotations.
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                0
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left transition hover:bg-slate-50"
            >
              <div>

                <p className="font-medium text-slate-800">
                  Calendar
                </p>

                <p className="text-sm text-slate-500">
                  View scheduled work.
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                0
              </span>

            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left transition hover:bg-slate-50"
            >
              <div>

                <p className="font-medium text-slate-800">
                  Invoices
                </p>

                <p className="text-sm text-slate-500">
                  View customer invoices.
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                0
              </span>

            </button>

          </div>

        </section>

        {/* Customer Actions */}

<section className="rounded-xl border border-slate-200 bg-white p-6">

  <div className="flex flex-wrap items-center justify-between gap-4">

    <div>

      <h3 className="text-lg font-semibold text-slate-800">
        Customer Actions
      </h3>

      <p className="text-sm text-slate-500">
        Save or remove this customer.
      </p>

    </div>

    <div className="flex gap-3">

      <button
        type="button"
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

          alert("Customer created successfully.");

        } else {

          await saveCustomer(editedCustomer);

          alert("Customer saved successfully.");

        }

      } catch (err) {

        console.error(err);

        alert("Unable to save customer.");

      }
    }}
    className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
  >
    Save Customer
  </button>

  {!isNewCustomer && (

    <button
      type="button"
      onClick={async () => {

        const confirmed = confirm(
          `Delete ${editedCustomer.first_name} ${editedCustomer.last_name}?`
        );

        if (!confirmed) return;

        try {

          await removeCustomer(
            editedCustomer.id
          );

          alert("Customer deleted.");

        } catch (err) {

          console.error(err);

          alert("Unable to delete customer.");

        }

      }}
      className="rounded-lg border border-red-200 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
    >
      Delete Customer
    </button>

  )}

</div>

          </div>

        </section>

      </div>

    </div>

  );

}