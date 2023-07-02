import { z } from "zod";
import User from "@/types/user";
import Product from "./product";

export const OrderStatus = z.enum([
  "Pending",
  "Confirmed",
  "Shipping",
  "Delivered",
  "Canceled",
]);

const Order = z.object({
  id: z.string().uuid(),
  reference: z.string(),
  amount: z.number(),
  date: z.string(),
  status: OrderStatus,
  customer: User,
  products: z.array(Product),
});

export type Order = z.infer<typeof Order>;
export type OrderStatus = z.infer<typeof OrderStatus>;

export default Order;
