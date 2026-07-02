export interface Opportunity {
  id: string;

  opportunity_number: number;

  customer_id: string;

  property_id: string;

  title: string;

  description: string | null;

  status: string;

  estimated_value: number;

  expected_close_date: string | null;

  assigned_to: string | null;

  notes: string | null;

  is_deleted: boolean;

  deleted_at: string | null;

  created_at: string;

  updated_at: string;
}