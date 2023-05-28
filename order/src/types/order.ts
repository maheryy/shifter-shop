import { ProductReferenceWithQuantity } from "./product";

export interface Order {
  id: string;
  customer: string;
  date: Date;
  reference: string;
  status: OrderStatus;
  amount: number;
  products: ProductReferenceWithQuantity[];
}

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface OrderCreationData {
  customer: string;
  reference: string;
  amount: number;
  status?: OrderStatus;
  products: ProductReferenceWithQuantity[];
}

export type OrderUpdateData = Pick<Order, "status">;
