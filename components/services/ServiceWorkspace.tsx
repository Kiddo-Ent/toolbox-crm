"use client";

import { useEffect, useState } from "react";

import { Service } from "@/types/service";

interface ServiceWorkspaceProps {
  service: Service;

  saveService: (service: Service) => Promise<void>;

  removeService: (id: number) => Promise<void>;
}

export default function ServiceWorkspace({
  service,
  saveService,
  removeService,
}: ServiceWorkspaceProps) {

  const [editedService, setEditedService] =
    useState<Service>(service);

  useEffect(() => {
    setEditedService(service);
  }, [service]);

  function updateField<K extends keyof Service>(
    field: K,
    value: Service[K]
  ) {
    setEditedService(current => ({
      ...current,
      [field]: value,
    }));
  }

  return (

    <div className="flex-1 bg-gray-100 overflow-auto">

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h1 className="text-3xl font-bold">
            {editedService.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Configure the default settings for this service.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Service Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-semibold mb-2">
                Service Name
              </label>

              <input
                value={editedService.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              <select
                value={editedService.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              >

                <option>Home Maintenance</option>
                <option>Technology</option>
                <option>Security Cameras</option>
                <option>Social Support</option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Rate
              </label>

              <input
                type="number"
                value={editedService.rate}
                onChange={(e) =>
                  updateField(
                    "rate",
                    Number(e.target.value)
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Unit
              </label>

              <input
                value={editedService.unit}
                onChange={(e) =>
                  updateField("unit", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Duration
              </label>

              <input
                value={editedService.duration}
                onChange={(e) =>
                  updateField("duration", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div className="flex items-center">

              <input
                type="checkbox"
                checked={editedService.taxable}
                onChange={(e) =>
                  updateField(
                    "taxable",
                    e.target.checked
                  )
                }
                className="mr-3 h-5 w-5"
              />

              <label className="font-semibold">
                GST Applies
              </label>

            </div>

          </div>

        </div>
                {/* Description */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">
            Description
          </h2>

          <textarea
            rows={6}
            value={editedService.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />

        </div>

        {/* Actions */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex flex-wrap gap-4">

            <button
              onClick={async () => {
                try {
                  await saveService(editedService);
                  alert("✅ Service saved successfully.");
                } catch (err) {
                  console.error(err);
                  alert("Unable to save service.");
                }
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              💾 Save Service
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              📄 Duplicate
            </button>

            <button
              onClick={async () => {
                if (
                  !confirm(
                    `Delete "${editedService.name}"?`
                  )
                ) {
                  return;
                }

                try {
                  await removeService(
                    editedService.id
                  );

                  alert(
                    "✅ Service deleted."
                  );
                } catch (err) {
                  console.error(err);
                  alert(
                    "Unable to delete service."
                  );
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              🗑 Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}