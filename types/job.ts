export interface Job {
  id: string;

  job_number: number;

  customer_id: string;

  property_id: string;

  opportunity_id: string;

  quote_id: string | null;

  title: string;

  description: string | null;

  status: string;

  priority: string;

  scheduled_date: string | null;

  completed_date: string | null;

  assigned_to: string | null;

  estimated_hours: number;

  actual_hours: number;

  labour_cost: number;

  materials_cost: number;

  total_cost: number;

  notes: string | null;

  created_at: string;

  updated_at: string;

  is_deleted: boolean;

  deleted_at: string | null;
}