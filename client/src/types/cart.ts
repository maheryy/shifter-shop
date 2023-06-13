import { z } from "zod";

const Cart = z.object({
  id: z.number(),
  userId: z.number(),
});

const AddProductToCart = z.object({
  productId: z.number(),
  quantity: z.number(),
});

const UpdateProductQuantity = z.object({
  quantity: z.number(),
});

export type Cart = z.infer<typeof Cart>;
export type AddProductToCart = z.infer<typeof AddProductToCart>;
export type UpdateProductQuantity = z.infer<typeof UpdateProductQuantity>;
