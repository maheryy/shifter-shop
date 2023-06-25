import { TProductReferenceWithQuantity, TProductWithQuantity } from "./product";
import { TUser } from "./user";

export interface TOrder {
  id: string;
  reference: string;
  amount: number;
  customerId: string;
  products: TProductReferenceWithQuantity[];
  status: EOrderStatus;
  date: Date;
}

export interface TFullOrder {
  id: string;
  reference: string;
  amount: number;
  customerId: string;
  customer: TUser;
  products: TProductWithQuantity[];
  status: EOrderStatus;
  date: Date;
}

export enum EOrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}
