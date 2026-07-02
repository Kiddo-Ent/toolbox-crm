export interface WebsiteLead {
  // ============================
  // Customer Details
  // ============================

  first_name: string;
  last_name: string;

  email: string;
  mobile_phone: string;

  company_name?: string | null;

  // ============================
  // Property Details
  // ============================

  address_line_1: string;
  address_line_2?: string | null;

  suburb: string;
  state: string;
  postcode: string;

  // ============================
  // Job Details
  // ============================

  service_required: string;

  description: string;

  preferred_date?: string | null;

  estimated_budget?: number | null;

  // ============================
  // Lead Information
  // ============================

  source:
    | "Website"
    | "Facebook"
    | "Google"
    | "Phone"
    | "Email"
    | "Referral"
    | "Other";

  priority:
    | "Low"
    | "Normal"
    | "High"
    | "Emergency";

  // ============================
  // Attachments
  // ============================

  photos?: string[];

  // ============================
  // Marketing
  // ============================

  marketing_consent: boolean;

  // ============================
  // Metadata
  // ============================

  submitted_at: string;

  ip_address?: string | null;

  user_agent?: string | null;
}