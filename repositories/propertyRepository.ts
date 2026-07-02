import { supabase } from "@/lib/supabase";
import { Property } from "@/types/property";

/**
 * Get all active properties
 */
export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_deleted", false)
    .order("property_name");

  if (error) {
    console.error("getProperties:", error);
    return [];
  }

  return data as Property[];
}

/**
 * Get one property
 */
export async function getProperty(
  id: string
): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProperty:", error);
    return null;
  }

  return data as Property;
}

/**
 * Create property
 */
export async function createProperty(
  property: Omit<
    Property,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("properties")
    .insert(property)
    .select()
    .single();

  if (error) {
    console.error("createProperty:", error);
    throw error;
  }

  return data as Property;
}

/**
 * Update property
 */
export async function updateProperty(
  property: Property
) {
  const { data, error } = await supabase
    .from("properties")
    .update({
      customer_id: property.customer_id,

      property_name: property.property_name,

      address_line_1: property.address_line_1,
      address_line_2: property.address_line_2,

      suburb: property.suburb,
      state: property.state,
      postcode: property.postcode,

      property_type: property.property_type,

      access_notes: property.access_notes,
      gate_code: property.gate_code,
      alarm_code: property.alarm_code,

      latitude: property.latitude,
      longitude: property.longitude,

      notes: property.notes,

      is_active: property.is_active,
    })
    .eq("id", property.id)
    .select()
    .single();

  if (error) {
    console.error("updateProperty:", error);
    throw error;
  }

  return data as Property;
}

/**
 * Soft delete property
 */
export async function deleteProperty(
  id: string
) {
  const { error } = await supabase
    .from("properties")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("deleteProperty:", error);
    throw error;
  }
}