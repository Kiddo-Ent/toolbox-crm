"use client";

import { Service } from "@/types/service";

interface ServiceListProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

function categoryColour(category: string) {
  switch (category) {
    case "Home Maintenance":
      return "bg-orange-100 text-orange-700";

    case "Technology":
      return "bg-blue-100 text-blue-700";

    case "Security Cameras":
      return "bg-purple-100 text-purple-700";

    case "Social Support":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ServiceList({
  services,
  selectedService,
  onSelectService,
}: ServiceListProps) {
  return (
    <div className="w-96 border-r bg-white flex flex-col">

      {/* Header */}

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold">
          Services
        </h2>

        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
          + New Service
        </button>

        <input
          type="text"
          placeholder="Search Services..."
          className="mt-4 w-full border rounded-lg px-4 py-3"
        />

      </div>

      {/* Services */}

      <div className="flex-1 overflow-y-auto">

        {services.map((service) => (

          <button
            key={service.id}
            onClick={() => onSelectService(service)}
            className={`w-full text-left p-5 border-b transition ${
              selectedService?.id === service.id
                ? "bg-orange-50 border-l-4 border-orange-500"
                : "hover:bg-gray-50"
            }`}
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="font-bold">
                  {service.name}
                </p>

                <span
                  className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${categoryColour(
                    service.category
                  )}`}
                >
                  {service.category}
                </span>

              </div>

              <div className="text-right">

                <p className="font-bold">
                  ${Number(service.rate).toFixed(2)}
                </p>

                <p className="text-sm text-gray-500">
                  / {service.unit}
                </p>

              </div>

            </div>

          </button>

        ))}

        {services.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No services found.
          </div>
        )}

      </div>

    </div>
  );
}