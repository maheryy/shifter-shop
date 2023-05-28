import { ProductReferenceWithQuantity } from "./product";

export interface Order {
  id: string;
  customer: string;
  date: Date;
  reference: string;
  status: OrderStatus;
  total: number;
  products: ProductReferenceWithQuantity[];
}

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipping = "Shipping",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export type OrderCreationData = Omit<Order, "id" | "status" | "date">;

export type OrderUpdateData = Pick<Order, "status">;
