import { TProductReferenceWithQuantity, TProductWithQuantity } from "./product";
import { TAddress } from "./profile";
import { TUser } from "./user";

export interface TOrder {
  id: string;
  reference: string;
  amount: number;
  customerId: string;
  products: TProductReferenceWithQuantity[];
  status: EOrderStatus;
  date: Date;
  address: Omit<TAddress, "id" | "profile" | "isDefault">;
}

export interface TFullOrder extends TOrder {
  customer: TUser;
  products: TProductWithQuantity[];
}

export enum EOrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}
