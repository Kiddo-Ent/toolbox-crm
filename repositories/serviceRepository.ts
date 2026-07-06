import { supabase } from "@/lib/supabase/client";
import { Service } from "@/types/service";

/**
 * Get all active services
 */
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("service_catalog")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) {
    console.error("getServices:", error);
    return [];
  }

  return data as Service[];
}

/**
 * Get one service
 */
export async function getService(
  id: number
): Promise<Service | null> {
  const { data, error } = await supabase
    .from("service_catalog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getService:", error);
    return null;
  }

  return data as Service;
}

/**
 * Create service
 */
export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at">
) {
  return await supabase
    .from("service_catalog")
    .insert(service);
}

/**
 * Update service
 */
export async function updateService(
  service: Service
) {
  return await supabase
    .from("service_catalog")
    .update({
      name: service.name,
      category: service.category,
      rate: service.rate,
      unit: service.unit,
      duration: service.duration,
      taxable: service.taxable,
      description: service.description,
      active: service.active,
    })
    .eq("id", service.id);
}

/**
 * Soft delete
 */
export async function deleteService(
  id: number
) {
  return await supabase
    .from("service_catalog")
    .update({
      active: false,
    })
    .eq("id", id);
}