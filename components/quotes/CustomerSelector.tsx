"use client";

interface Customer {
  id: number;
  name: string;
  property: string;
}

interface CustomerSelectorProps {
  customer: Customer;
  onCustomerChange: (customer: Customer) => void;
}

const customers: Customer[] = [
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

export default function CustomerSelector({
  customer,
  onCustomerChange,
}: CustomerSelectorProps) {
  return (
    <div className="space-y-6">

      <div>

        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Customer
        </label>

        <select
          value={customer.id}
          onChange={(e) => {
            const selected = customers.find(
              (c) => c.id === Number(e.target.value)
            );

            if (selected) {
              onCustomerChange(selected);
            }
          }}
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

    </div>
  );
}