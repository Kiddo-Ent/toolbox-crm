export interface Quote {
  id: string;

  quote_number: number;

  version: number;

  customer_id: string;

  property_id: string;

  opportunity_id: string;

  quote_status: string;

  issue_date: string;

  expiry_date: string;

  materials_total: number;

  labour_total: number;

  subtotal: number;

  gst: number;

  total: number;

  customer_notes: string | null;

  internal_notes: string | null;

  created_at: string;

  updated_at: string;

  is_deleted: boolean;

  deleted_at: string | null;
}