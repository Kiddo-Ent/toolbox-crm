import { supabase } from "@/lib/supabase";
import { Opportunity } from "@/types/opportunity";

/**
 * Get all active opportunities
 */
export async function getOpportunities(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_deleted", false)
    .order("opportunity_number", {
      ascending: false,
    });

  if (error) {
    console.error("getOpportunities:", error);
    return [];
  }

  return data as Opportunity[];
}

/**
 * Get one opportunity
 */
export async function getOpportunity(
  id: string
): Promise<Opportunity | null> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getOpportunity:", error);
    return null;
  }

  return data as Opportunity;
}

/**
 * Create opportunity
 */
export async function createOpportunity(
  opportunity: Omit<
    Opportunity,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("opportunities")
    .insert(opportunity)
    .select()
    .single();

  if (error) {
    console.error(
      "createOpportunity:",
      error
    );
    throw error;
  }

  return data as Opportunity;
}

/**
 * Update opportunity
 */
export async function updateOpportunity(
  opportunity: Opportunity
) {
  const { data, error } = await supabase
    .from("opportunities")
    .update({
      opportunity_number:
        opportunity.opportunity_number,

      customer_id:
        opportunity.customer_id,

      property_id:
        opportunity.property_id,

      title:
        opportunity.title,

      description:
        opportunity.description,

      status:
        opportunity.status,

      estimated_value:
        opportunity.estimated_value,

      expected_close_date:
        opportunity.expected_close_date,

      assigned_to:
        opportunity.assigned_to,

      notes:
        opportunity.notes,
    })
    .eq("id", opportunity.id)
    .select()
    .single();

  if (error) {
    console.error(
      "updateOpportunity:",
      error
    );
    throw error;
  }

  return data as Opportunity;
}

/**
 * Soft delete opportunity
 */
export async function deleteOpportunity(
  id: string
) {
  const { error } = await supabase
    .from("opportunities")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error(
      "deleteOpportunity:",
      error
    );
    throw error;
  }
}