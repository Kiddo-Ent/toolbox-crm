import { supabase } from "@/lib/supabase";
import { QuoteItem } from "@/types/quoteItem";

/**
 * Get all items for a quote
 */
export async function getQuoteItems(
  quoteId: string
): Promise<QuoteItem[]> {

  const { data, error } = await supabase
    .from("quote_items")
    .select("*")
    .eq("quote_id", quoteId)
    .eq("is_deleted", false)
    .order("line_number");

  if (error) {
    console.error("getQuoteItems:", error);
    return [];
  }

  return data as QuoteItem[];
}

/**
 * Get a single quote item
 */
export async function getQuoteItem(
  id: string
): Promise<QuoteItem | null> {

  const { data, error } = await supabase
    .from("quote_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getQuoteItem:", error);
    return null;
  }

  return data as QuoteItem;
}

/**
 * Create a quote item
 */
export async function createQuoteItem(
  item: Omit<
    QuoteItem,
    "id" | "created_at" | "updated_at"
  >
) {

  const { data, error } = await supabase
    .from("quote_items")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("createQuoteItem:", error);
    throw error;
  }

  return data as QuoteItem;
}

/**
 * Update a quote item
 */
export async function updateQuoteItem(
  item: QuoteItem
) {

  const lineTotal =
    item.quantity *
    item.unit_price *
    (1 - item.discount / 100);

  const { data, error } = await supabase
    .from("quote_items")
    .update({

      line_number: item.line_number,

      description: item.description,

      quantity: item.quantity,

      unit: item.unit,

      unit_price: item.unit_price,

      discount: item.discount,

      gst_rate: item.gst_rate,

      line_total: lineTotal,

      item_type: item.item_type,

      notes: item.notes,

    })
    .eq("id", item.id)
    .select()
    .single();

  if (error) {
    console.error("updateQuoteItem:", error);
    throw error;
  }

  return data as QuoteItem;
}

/**
 * Delete (soft delete) a quote item
 */
export async function deleteQuoteItem(
  id: string
) {

  const { error } = await supabase
    .from("quote_items")
    .update({

      is_deleted: true,

      deleted_at: new Date().toISOString(),

    })
    .eq("id", id);

  if (error) {
    console.error("deleteQuoteItem:", error);
    throw error;
  }

}