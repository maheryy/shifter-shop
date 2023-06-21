import { z } from "zod";
import Product from "./product";

const CartProduct = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number(),
  rating: z.number(),
  reviewsCount: z.number(),
});

const AddProductToCart = z.object({
  productToAdd: Product,
  quantity: z.number(),
});

const UpdateProductQuantity = z.object({
  productId: Product.shape.id,
  quantity: z.number(),
});

export type CartProduct = z.infer<typeof CartProduct>;
export type AddProductToCart = z.infer<typeof AddProductToCart>;
export type UpdateProductQuantity = z.infer<typeof UpdateProductQuantity>;

export default CartProduct;
