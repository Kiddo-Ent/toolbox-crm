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

/**
 * Static catalogue item.
 * Used by the quote builder and service picker.
 * These are NOT database records.
 */
export interface ServiceCatalogueItem {
  id: number;

  name: string;
  category: string;

  rate: number;
  unit: string;
  duration: string;

  taxable: boolean;

  description: string;
}