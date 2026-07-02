import { WebsiteLead } from "@/types/websiteLead";

import { createLead } from "@/repositories/leadRepository";

export interface LeadResult {
  success: boolean;

  customerId: string;

  propertyId: string;

  opportunityId: string;

  message: string;
}

/**
 * Validates a website lead before it is saved.
 */
function validateLead(lead: WebsiteLead) {
  if (!lead.first_name.trim()) {
    throw new Error("First name is required.");
  }

  if (!lead.last_name.trim()) {
    throw new Error("Last name is required.");
  }

  if (!lead.email.trim()) {
    throw new Error("Email is required.");
  }

  if (!lead.mobile_phone.trim()) {
    throw new Error("Mobile phone is required.");
  }

  if (!lead.address_line_1.trim()) {
    throw new Error("Property address is required.");
  }

  if (!lead.suburb.trim()) {
    throw new Error("Suburb is required.");
  }

  if (!lead.state.trim()) {
    throw new Error("State is required.");
  }

  if (!lead.postcode.trim()) {
    throw new Error("Postcode is required.");
  }

  if (!lead.service_required.trim()) {
    throw new Error("Service is required.");
  }

  if (!lead.description.trim()) {
    throw new Error("Description is required.");
  }
}

/**
 * Main service used by the public website.
 *
 * Website
 *    ↓
 * Validate
 *    ↓
 * Customer
 *    ↓
 * Property
 *    ↓
 * Opportunity
 */
export async function processWebsiteLead(
  lead: WebsiteLead
): Promise<LeadResult> {

  validateLead(lead);

  const result = await createLead(lead);

  return {

    success: true,

    customerId: result.customer.id,

    propertyId: result.property.id,

    opportunityId: result.opportunity.id,

    message:
      "Quote request received successfully.",

  };

}