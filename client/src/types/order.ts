import { z } from "zod";
import User from "@/types/user";
import OrderProduct from "./orderProduct";

export const OrderStatus = z.enum([
  "pending",
  "confirmed",
  "shipping",
  "delivered",
]);

const Order = z.object({
  id: z.number(),
  reference: z.string(),
  totalAmount: z.number(),
  date: z.string(),
  status: OrderStatus,
  customer: User,
  products: z.array(OrderProduct),
});

export type Order = z.infer<typeof Order>;
export type OrderStatus = z.infer<typeof OrderStatus>;

export default Order;
