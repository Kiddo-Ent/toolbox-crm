export interface Property {
  id: string;

  property_number: number;

  customer_id: string;

  property_name: string;

  address_line_1: string;
  address_line_2: string | null;

  suburb: string;
  state: string;
  postcode: string;

  latitude: number | null;
  longitude: number | null;

  access_notes: string | null;
  gate_code: string | null;
  alarm_code: string | null;

  property_notes: string | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;

  is_deleted: boolean;
  deleted_at: string | null;
}