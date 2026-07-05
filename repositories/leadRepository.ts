import { supabaseAdmin } from "@/lib/supabase/admin";

import { WebsiteLead } from "@/types/websiteLead";

/**
 * Find an existing customer by email.
 */
export async function findCustomerByEmail(
  email: string
) {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("email", email)
    .eq("is_deleted", false)
    .maybeSingle();

  if (error) throw error;

  return data;
}

/**
 * Create a new customer.
 */
export async function createCustomer(
  lead: WebsiteLead
) {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert({
      first_name: lead.first_name,
      last_name: lead.last_name,

      company_name: lead.company_name,

      mobile_phone: lead.mobile_phone,
      email: lead.email,

      address_line_1: lead.address_line_1,
      address_line_2: lead.address_line_2,

      suburb: lead.suburb,
      state: lead.state,
      postcode: lead.postcode,

      is_active: true,
      is_deleted: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Find an existing property for the customer.
 */
export async function findProperty(
  customerId: string,
  lead: WebsiteLead
) {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("customer_id", customerId)
    .eq("address_line_1", lead.address_line_1)
    .eq("postcode", lead.postcode)
    .eq("is_deleted", false)
    .maybeSingle();

  if (error) throw error;

  return data;
}

/**
 * Create a property.
 */
export async function createProperty(
  customerId: string,
  lead: WebsiteLead
) {
  const { data, error } = await supabaseAdmin 
    .from("properties")
    .insert({
      customer_id: customerId,

      address_line_1: lead.address_line_1,
      address_line_2: lead.address_line_2,

      suburb: lead.suburb,
      state: lead.state,
      postcode: lead.postcode,

      is_deleted: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Create a new Opportunity.
 */
export async function createOpportunity(
  customerId: string,
  propertyId: string,
  lead: WebsiteLead
) {
  const { data, error } = await supabaseAdmin
    .from("opportunities")
    .insert({
      customer_id: customerId,

      property_id: propertyId,

      title: lead.service_required,

      description: lead.description,

      status: "Lead",

      estimated_value:
        lead.estimated_budget ?? 0,

      expected_close_date:
        lead.preferred_date,

      notes:
        `Website Lead\n\n` +
        `Source: ${lead.source}\n` +
        `Submitted: ${lead.submitted_at}`,

      is_deleted: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Main entry point used by the API.
 */
export async function createLead(
  lead: WebsiteLead
) {

  let customer =
    await findCustomerByEmail(
      lead.email
    );

  if (!customer) {

    customer =
      await createCustomer(
        lead
      );

  }

  let property =
    await findProperty(
      customer.id,
      lead
    );

  if (!property) {

    property =
      await createProperty(
        customer.id,
        lead
      );

  }

  const opportunity =
    await createOpportunity(
      customer.id,
      property.id,
      lead
    );

  return {

    customer,

    property,

    opportunity,

  };

}