export interface TAddress {
  id: string;
  profile: TCustomerProfile;
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  province: string;
  phone: string;
  isDefault: boolean;
}

export interface TCustomerProfile {
  id: string;
  phone?: string;
  addresses: TAddress[];
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
