export interface Opportunity {
  id: string;

  opportunity_number: number;

  customer_id: string;

  property_id: string;

  title: string;

  description: string | null;

  source: string;

  opportunity_status: string;

  estimated_value: number | null;

  expected_start_date: string | null;

  expected_completion_date: string | null;

  probability: number;

  notes: string | null;

  is_deleted: boolean;

  deleted_at: string | null;

  created_at: string;

  updated_at: string;
}