"use client";

import { useMemo } from "react";
import { QuoteItem } from "@/types/quoteItem";

interface QuoteItemsGridProps {
  items?: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
  onSaveItem?: (item: QuoteItem) => Promise<void>;
  onDeleteItem?: (id: string) => Promise<void>;
  onAddItem?: () => Promise<void>;
}

export default function QuoteItemsGrid({
  items,
  onItemsChange,
  onSaveItem,
  onDeleteItem,
  onAddItem,
}: QuoteItemsGridProps) {
  // Always work with an array
  const safeItems = items ?? [];

  function updateItem<K extends keyof QuoteItem>(
    id: string,
    field: K,
    value: QuoteItem[K]
  ) {
    onItemsChange(
      safeItems.map((item) => {
        if (item.id !== id) return item;

        const updated = {
          ...item,
          [field]: value,
        };

        const qty = Number(updated.quantity) || 0;
        const rate = Number(updated.unit_price) || 0;
        const disc = Number(updated.discount) || 0;

        updated.line_total =
          qty * rate * (1 - disc / 100);

        return updated;
      })
    );
  }

  const totals = useMemo(() => {
    const materials = safeItems
      .filter(
        (i) => i.item_type === "Material"
      )
      .reduce(
        (sum, i) => sum + i.line_total,
        0
      );

    const labour = safeItems
      .filter(
        (i) => i.item_type !== "Material"
      )
      .reduce(
        (sum, i) => sum + i.line_total,
        0
      );

    const subtotal =
      materials + labour;

    const gst = safeItems.reduce(
      (sum, i) =>
        sum +
        i.line_total *
          (i.gst_rate / 100),
      0
    );

    return {
      materials,
      labour,
      subtotal,
      gst,
      total: subtotal + gst,
    };
  }, [safeItems]);

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Quote Items
        </h2>

        <button
          onClick={() => onAddItem?.()}
          className="rounded-lg bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
        >
          + Add Item
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b">

            <tr className="text-left">

              <th className="py-2">#</th>

              <th>Description</th>

              <th>Qty</th>

              <th>Unit</th>

              <th>Rate</th>

              <th>Disc %</th>

              <th className="text-right">
                Total
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {safeItems.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="py-12 text-center text-slate-500"
                >

                  <div className="text-4xl">
                    📦
                  </div>

                  <div className="mt-4 text-lg font-semibold">

                    No Quote Items

                  </div>

                  <div className="mt-2">

                    Click <strong>+ Add Item</strong> to
                    start building this quote.

                  </div>

                </td>

              </tr>

            )}

            {safeItems.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td>
                  {item.line_number}
                </td>

                <td>

                  <input
                    value={
                      item.description
                    }
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full rounded border px-2 py-1"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    value={
                      item.quantity
                    }
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-20 rounded border px-2 py-1"
                  />

                </td>

                <td>

                  <input
                    value={item.unit}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unit",
                        e.target.value
                      )
                    }
                    className="w-20 rounded border px-2 py-1"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    value={
                      item.unit_price
                    }
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unit_price",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-24 rounded border px-2 py-1"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    value={
                      item.discount
                    }
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "discount",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-20 rounded border px-2 py-1"
                  />

                </td>

                <td className="text-right font-semibold">

                  $
                  {item.line_total.toFixed(
                    2
                  )}

                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      onSaveItem?.(item)
                    }
                  >
                    💾
                  </button>

                  <button
                    onClick={() =>
                      onDeleteItem?.(
                        item.id
                      )
                    }
                  >
                    🗑
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Totals */}

      <div className="ml-auto mt-8 max-w-sm space-y-2">

        <div className="flex justify-between">

          <span>Materials</span>

          <span>
            $
            {totals.materials.toFixed(
              2
            )}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Labour</span>

          <span>
            $
            {totals.labour.toFixed(
              2
            )}
          </span>

        </div>

        <div className="flex justify-between border-t pt-2">

          <span>Subtotal</span>

          <span>
            $
            {totals.subtotal.toFixed(
              2
            )}
          </span>

        </div>

        <div className="flex justify-between">

          <span>GST</span>

          <span>
            $
            {totals.gst.toFixed(
              2
            )}
          </span>

        </div>

        <div className="flex justify-between border-t pt-2 text-xl font-bold">

          <span>Total</span>

          <span>
            $
            {totals.total.toFixed(
              2
            )}
          </span>

        </div>

      </div>

    </div>
  );
}