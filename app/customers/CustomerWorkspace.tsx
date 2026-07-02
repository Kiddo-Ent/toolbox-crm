"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";

interface CustomerWorkspaceProps {
  customer: Customer;
  saveCustomer: (customer: Customer) => Promise<void>;
  addCustomer: (
    customer: Omit<Customer, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
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

  function updateField<K extends keyof Customer>(
    field: K,
    value: Customer[K]
  ) {
    setEditedCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const isNewCustomer = editedCustomer.id === "";

  async function handleSave() {
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
        await saveCustomer(editedCustomer);

        alert("✅ Customer saved successfully.");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to save customer.");
    }
  }

  async function handleDelete() {
    if (isNewCustomer) return;

    if (
      !confirm(
        `Delete ${editedCustomer.first_name} ${editedCustomer.last_name}?`
      )
    ) {
      return;
    }

    try {
      await removeCustomer(editedCustomer.id);

      alert("Customer deleted.");
    } catch (err) {
      console.error(err);
      alert("Unable to delete customer.");
    }
  }

  return (
    <div className="h-full overflow-y-auto rounded-2xl bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              {isNewCustomer
                ? "New Customer"
                : `${editedCustomer.first_name} ${editedCustomer.last_name}`}

            </h1>

            <p className="mt-2 text-slate-500">

              Customer #{editedCustomer.customer_number || "New"}

            </p>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              editedCustomer.is_active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {editedCustomer.is_active ? "Active" : "Inactive"}
          </span>

        </div>

      </div>

      <div className="space-y-8 p-8">

        {/* Contact Information */}

        <section className="rounded-2xl border border-slate-200 p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Contact Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                First Name
              </label>

              <input
                value={editedCustomer.first_name}
                onChange={(e) =>
                  updateField("first_name", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Last Name
              </label>

              <input
                value={editedCustomer.last_name}
                onChange={(e) =>
                  updateField("last_name", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Company
              </label>

              <input
                value={editedCustomer.company_name}
                onChange={(e) =>
                  updateField("company_name", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Mobile Phone
              </label>

              <input
                value={editedCustomer.mobile_phone}
                onChange={(e) =>
                  updateField("mobile_phone", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Home Phone
              </label>

              <input
                value={editedCustomer.home_phone}
                onChange={(e) =>
                  updateField("home_phone", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Email
              </label>

              <input
                type="email"
                value={editedCustomer.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

          </div>

        </section>

        {/* Address */}

        <section className="rounded-2xl border border-slate-200 p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Address
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Address Line 1
              </label>

              <input
                value={editedCustomer.address_line_1}
                onChange={(e) =>
                  updateField("address_line_1", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Address Line 2
              </label>

              <input
                value={editedCustomer.address_line_2}
                onChange={(e) =>
                  updateField("address_line_2", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Suburb
              </label>

              <input
                value={editedCustomer.suburb}
                onChange={(e) =>
                  updateField("suburb", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                State
              </label>

              <input
                value={editedCustomer.state}
                onChange={(e) =>
                  updateField("state", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Postcode
              </label>

              <input
                value={editedCustomer.postcode}
                onChange={(e) =>
                  updateField("postcode", e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

          </div>

        </section>

        {/* Notes */}

        <section className="rounded-2xl border border-slate-200 p-6">

          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Notes
          </h2>

          <textarea
            rows={6}
            value={editedCustomer.notes}
            onChange={(e) =>
              updateField("notes", e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 resize-none"
            placeholder="Customer notes..."
          />

        </section>

        {/* Actions */}

        <section className="rounded-2xl border border-slate-200 p-6">

          <div className="flex flex-wrap gap-4">

            <button
              onClick={handleSave}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              💾 Save Customer
            </button>

            <button
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              🏡 Properties
            </button>

            <button
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              📝 Quotes
            </button>

            <button
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              📅 Jobs
            </button>

            {!isNewCustomer && (
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                🗑 Delete Customer
              </button>
            )}

          </div>

        </section>

      </div>

    </div>
  );
}