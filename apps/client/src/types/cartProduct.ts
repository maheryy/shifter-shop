import { z } from "zod";
import Product from "./product";

const CartProduct = z.object({
  product: Product,
  quantity: z.number(),
});

const UpdateProductQuantity = z.object({
  productId: Product.shape.id,
  quantity: z.number(),
});

export type CartProduct = z.infer<typeof CartProduct>;
export type UpdateProductQuantity = z.infer<typeof UpdateProductQuantity>;

export default CartProduct;
