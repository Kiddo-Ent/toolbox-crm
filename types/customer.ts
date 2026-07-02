export interface Customer {
  id: string;

  customer_number: number;

  first_name: string;
  last_name: string;

  company_name: string | null;

  mobile_phone: string | null;
  home_phone: string | null;
  email: string | null;

  address_line_1: string | null;
  address_line_2: string | null;

  suburb: string | null;
  state: string | null;
  postcode: string | null;

  notes: string | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;

  is_deleted: boolean;
  deleted_at: string | null;
}