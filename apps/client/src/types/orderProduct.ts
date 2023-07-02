import { z } from "zod";
import Category from "./category";
import User from "./user";

const OrderProduct = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  name: z.string(),
  description: z.string(),
  rating: z.number(),
  price: z.number(),
  image: z.string().url(),
  category: Category,
  seller: User,
});

export type OrderProduct = z.infer<typeof OrderProduct>;

export default OrderProduct;
