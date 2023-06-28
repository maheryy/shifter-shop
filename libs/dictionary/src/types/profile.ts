export interface TCustomerProfile {
  id: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
}

export interface TBusinessProfile {
  id: string;
  company: string;
  description?: string;
  website?: string;
  phone?: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}
