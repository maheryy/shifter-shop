export enum EBusinessRequestStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export interface TAddress {
  id: string;
  profile: TCustomerProfile;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  zip: string;
  province: string;
  phone: string;
  isDefault: boolean;
}

export interface TCustomerProfile {
  userId: string;
  phone?: string;
  addresses: TAddress[];
}

export interface TBusinessAddress {
  line1: string;
  line2?: string;
  city: string;
  zip: string;
  province: string;
}

export interface TBusinessProfile {
  userId: string;
  company: string;
  description?: string;
  website?: string;
  phone: string;
  address: TBusinessAddress;
}

export interface TBusinessRequest {
  id: string;
  userId: string;
  company: string;
  intent: string;
  phone: string;
  status: EBusinessRequestStatus;
}
