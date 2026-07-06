import { supabase } from "@/lib/supabase/client";
import { Customer } from "@/types/customer";

/**
 * Get all active customers
 */
export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("is_deleted", false)
    .order("last_name")
    .order("first_name");

  console.log("========== CUSTOMERS ==========");
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    throw error;
  }

  return data as Customer[];
}

/**
 * Get a single customer by ID
 */
export async function getCustomer(
  id: string
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getCustomer:", error);
    return null;
  }

  return data as Customer;
}

/**
 * Create a new customer
 */
export async function createCustomer(
  customer: Omit<
    Customer,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) {
    console.error("createCustomer:", error);
    throw error;
  }

  return data as Customer;
}

/**
 * Update an existing customer
 */
export async function updateCustomer(
  customer: Customer
) {
  const { data, error } = await supabase
    .from("customers")
    .update({
      customer_number: customer.customer_number,

      first_name: customer.first_name,
      last_name: customer.last_name,

      company_name: customer.company_name,

      mobile_phone: customer.mobile_phone,
      home_phone: customer.home_phone,
      email: customer.email,

      address_line_1: customer.address_line_1,
      address_line_2: customer.address_line_2,

      suburb: customer.suburb,
      state: customer.state,
      postcode: customer.postcode,

      notes: customer.notes,

      is_active: customer.is_active,
    })
    .eq("id", customer.id)
    .select()
    .single();

  if (error) {
    console.error("updateCustomer:", error);
    throw error;
  }

  return data as Customer;
}

/**
 * Soft delete a customer
 */
export async function deleteCustomer(
  id: string
) {
  const { error } = await supabase
    .from("customers")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("deleteCustomer:", error);
    throw error;
  }
}