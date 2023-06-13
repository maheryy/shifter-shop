export interface Address {
  id: number;
  user: number;
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  province: string;
  phone: string;
}

export type CreateAddress = Omit<Address, "id" | "user">;
