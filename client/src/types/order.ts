import { Product, ProductWithQuantity } from "@/types/product";
import { User } from "@/types/user";

export interface Order {
  id: number;
  reference: string;
  totalAmount: number;
  date: string;
  status: OrderStatus;
  customer: User;
  products: ProductWithQuantity[];
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
