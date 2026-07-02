export interface Service {
  id: number;

  name: string;
  category: string;

  rate: number;
  unit: string;
  duration: string;

  taxable: boolean;

  description: string;

  active: boolean;

  created_at: string;
  updated_at: string;
}