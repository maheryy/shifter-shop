import { z } from "zod";

export const SyncCart = z.object({
  cart: z
    .array(z.object({ productId: z.string().uuid(), quantity: z.number() }))
    .refine((cartItem) => cartItem.length !== 0, {
      message: "The provided cart is empty",
    }),
});

export type TSyncCart = z.infer<typeof SyncCart>;
