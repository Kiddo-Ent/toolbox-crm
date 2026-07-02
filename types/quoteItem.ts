export interface QuoteItem {
  id: string;

  quote_id: string;

  line_number: number;

  item_type: string;

  description: string;

  quantity: number;

  unit: string;

  unit_price: number;

  discount: number;

  gst_rate: number;

  line_total: number;

  notes: string | null;

  is_deleted: boolean;

  deleted_at: string | null;

  created_at: string;

  updated_at: string;
}