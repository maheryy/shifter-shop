import type { Product } from "@/types/product";
import { User } from "@/types/user";
import type { OrderProduct } from "./orderProduct";

export interface Order {
  id: number;
  reference: string;
  totalAmount: number;
  date: string;
  status: OrderStatus;
  customer: User;
  products: OrderProduct[];
}

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipping = "shipping",
  Delivered = "delivered",
}

export interface OrderAndProduct {
  order: Order;
  product: Product;
}
