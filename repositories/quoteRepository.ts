import { supabase } from "@/lib/supabase";
import { Quote } from "@/types/quote";

/**
 * Get all active quotes
 */
export async function getQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("is_deleted", false)
    .order("quote_number", {
      ascending: false,
    });

  if (error) {
    console.error("getQuotes:", error);
    return [];
  }

  return data as Quote[];
}

/**
 * Get a single quote
 */
export async function getQuote(
  id: string
): Promise<Quote | null> {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getQuote:", error);
    return null;
  }

  return data as Quote;
}

/**
 * Create a quote
 */
export async function createQuote(
  quote: Omit<
    Quote,
    "id" | "created_at" | "updated_at"
  >
): Promise<Quote> {
  const { data, error } = await supabase
    .from("quotes")
    .insert(quote)
    .select()
    .single();

  if (error) {
    console.error("createQuote:", error);
    throw error;
  }

  return data as Quote;
}

/**
 * Update a quote
 */
export async function updateQuote(
  quote: Quote
): Promise<Quote> {
  const { data, error } = await supabase
    .from("quotes")
    .update({

      quote_number: quote.quote_number,

      version: quote.version,

      customer_id: quote.customer_id,

      property_id: quote.property_id,

      opportunity_id: quote.opportunity_id,

      quote_status: quote.quote_status,

      issue_date: quote.issue_date,

      expiry_date: quote.expiry_date,

      materials_total: quote.materials_total,

      labour_total: quote.labour_total,

      subtotal: quote.subtotal,

      gst: quote.gst,

      total: quote.total,

      customer_notes: quote.customer_notes,

      internal_notes: quote.internal_notes,

    })
    .eq("id", quote.id)
    .select()
    .single();

  if (error) {
    console.error("updateQuote:", error);
    throw error;
  }

  return data as Quote;
}

/**
 * Soft delete
 */
export async function deleteQuote(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("quotes")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("deleteQuote:", error);
    throw error;
  }
}