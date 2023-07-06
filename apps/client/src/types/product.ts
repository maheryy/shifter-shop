import { z } from "zod";
import Category from "./category";
import Review from "./review";

const Product = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  categoryId: z.string().uuid(),
  category: Category,
});

const UpdateProduct = Product.pick({
  name: true,
  description: true,
  price: true,
}).partial();

export const DetailedProduct = Product.extend({
  categories: z.array(Category),
  reviews: z.array(Review),
});

export type TProduct = z.infer<typeof Product>;
export type DetailedProduct = z.infer<typeof DetailedProduct>;
export type TUpdateProduct = z.infer<typeof UpdateProduct>;

export default Product;
