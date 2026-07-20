"use client";

import { QuoteItem } from "@/types/quoteItem";

interface QuoteItemsGridProps {
  items: QuoteItem[];

  onItemsChange: (
    items: QuoteItem[]
  ) => void;

  onAddItem: () => void;

  onSaveItem: (
    item: QuoteItem
  ) => Promise<void>;

  onDeleteItem: (
    id: string
  ) => Promise<void>;
}

function currency(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function QuoteItemsGrid({
  items,
  onItemsChange,
  onAddItem,
  onSaveItem,
  onDeleteItem,
}: QuoteItemsGridProps) {

  function updateItem(
    id: string,
    field: keyof QuoteItem,
    value: string | number
  ) {

    const updatedItems = items.map((item) => {

      if (item.id !== id) {
        return item;
      }

      const updated: QuoteItem = {
        ...item,
        [field]: value,
      } as QuoteItem;

      const subtotal =
        updated.quantity *
        updated.unit_price;

      const discountAmount =
        subtotal *
        (updated.discount / 100);

      updated.line_total =
        subtotal -
        discountAmount;

      return updated;

    });

    onItemsChange(updatedItems);

  }

  return (

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Quote Items
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Materials, labour and other charges.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onAddItem}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Material
          </button>

          <button
            type="button"
            onClick={() => {

              const labour: QuoteItem = {

                id: crypto.randomUUID(),

                quote_id:
                  items[0]?.quote_id ?? "",

                line_number:
                  items.length + 1,

                item_type: "Labour",

                description: "",

                quantity: 1,

                unit: "hrs",

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

              onItemsChange([
                ...items,
                labour,
              ]);

            }}
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            + Labour
          </button>

          <button
            type="button"
            onClick={() => {

              const other: QuoteItem = {

                id: crypto.randomUUID(),

                quote_id:
                  items[0]?.quote_id ?? "",

                line_number:
                  items.length + 1,

                item_type: "Other",

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

              onItemsChange([
                ...items,
                other,
              ]);

            }}
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          >
            + Other
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 z-10 bg-slate-100 shadow-sm">

            <tr>

              <th className="px-4 py-3 text-left">
                #
              </th>

              <th className="px-4 py-3 text-left">
                Qty
              </th>

              <th className="px-4 py-3 text-left">
                Description
              </th>

              <th className="px-4 py-3 text-left">
                Unit
              </th>

              <th className="px-4 py-3 text-right">
                Rate
              </th>

              <th className="px-4 py-3 text-right">
                Discount
              </th>

              <th className="px-4 py-3 text-right">
                GST
              </th>

              <th className="px-4 py-3 text-right">
                Total
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {items.length === 0 && (

              <tr>

                <td
                  colSpan={10}
                  className="py-16 text-center text-slate-500"
                >
                  No items have been added yet.

Use the buttons above to add
Materials, Labour or Other charges.
                </td>

              </tr>

            )}

            {items.map((item) => (

              <tr
                key={item.id}
                className={`border-t transition hover:bg-slate-50 ${
  item.item_type === "Material"
    ? "bg-blue-50/40"
    : item.item_type === "Labour"
    ? "bg-emerald-50/40"
    : "bg-purple-50/40"
}`}
              >
<td className="px-4 text-center font-semibold text-slate-500">
  {item.line_number}
</td>
                <td className="p-3">

                  <select
                    value={item.item_type}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "item_type",
                        e.target.value
                      )
                    }
                    className="rounded-lg border px-2 py-2"
                  >
                    <option>Material</option>
                    <option>Labour</option>
                    <option>Other</option>
                  </select>

                </td>
                                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded-lg border px-3 py-2 text-right"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description..."
                    className="w-full min-w-[260px] rounded-lg border px-3 py-2"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unit",
                        e.target.value
                      )
                    }
                    className="w-20 rounded-lg border px-3 py-2 text-center"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unit_price",
                        Number(e.target.value)
                      )
                    }
                    className="w-28 rounded-lg border px-3 py-2 text-right"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="number"
                    step="0.01"
                    value={item.discount}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "discount",
                        Number(e.target.value)
                      )
                    }
                    className="w-24 rounded-lg border px-3 py-2 text-right"
                  />
                </td>

                <td className="p-3">
                  <input
                    type="number"
                    step="0.01"
                    value={item.gst_rate}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "gst_rate",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded-lg border px-3 py-2 text-right"
                  />
                </td>

                <td className="p-3 text-right font-semibold text-lg font-bold text-emerald-700">
                  ${currency(item.line_total)}
                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      type="button"
                      onClick={() => onSaveItem(item)}
                      className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDeleteItem(item.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
          </div>

  );

}