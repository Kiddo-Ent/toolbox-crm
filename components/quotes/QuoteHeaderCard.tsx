"use client";

import { useState } from "react";

const customers = [
  {
    id: 1,
    name: "Gary Smith",
    property: "12 High Street, Inverloch",
  },
  {
    id: 2,
    name: "Mary Jones",
    property: "8 Beach Road, Venus Bay",
  },
  {
    id: 3,
    name: "John Brown",
    property: "45 Station Road, Foster",
  },
];

const services = [
  "Home Maintenance",
  "Technology",
  "Security Cameras",
  "Social Support",
];

const statuses = [
  "Draft",
  "Sent",
  "Accepted",
  "Expired",
];

export default function QuoteHeaderCard() {
  const [customerId, setCustomerId] = useState(1);
  const [service, setService] = useState("Home Maintenance");
  const [status, setStatus] = useState("Draft");
  const [expiryDate, setExpiryDate] = useState("2026-07-26");

  const customer =
    customers.find((c) => c.id === customerId) ?? customers[0];

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <h2 className="text-2xl font-bold mb-6">
        Quote Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Customer */}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Customer
          </label>

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(Number(e.target.value))
            }
            className="w-full border rounded-lg px-4 py-3"
          >
            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Property */}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Property
          </label>

          <input
            value={customer.property}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
          />
        </div>

        {/* Service */}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Service
          </label>

          <select
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3"
          >
            {services.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3"
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Expiry Date */}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Quote Expiry
          </label>

          <input
            type="date"
            value={expiryDate}
            onChange={(e) =>
              setExpiryDate(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}