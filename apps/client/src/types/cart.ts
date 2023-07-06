import { z } from "zod";
import CartProduct from "./cartProduct";

const Cart = z.array(CartProduct);

const SyncCart = z.object({
  cart: z.array(
    z.object({ productId: z.string().uuid(), quantity: z.number().int() }),
  ),
});

export type TCart = z.infer<typeof Cart>;
export type TSyncCart = z.infer<typeof SyncCart>;
