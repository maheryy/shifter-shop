import { z } from "zod";
import CartProduct from "./cartProduct";

const LocalCart = z.object({
  products: z.array(CartProduct),
});

const Cart = LocalCart.extend({
  id: z.number(),
  userId: z.number(),
});

export type LocalCart = z.infer<typeof LocalCart>;
export type Cart = z.infer<typeof Cart>;
