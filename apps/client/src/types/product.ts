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
});

export const DetailedProduct = Product.extend({
  categories: z.array(Category),
  reviews: z.array(Review),
});

export type Product = z.infer<typeof Product>;
export type DetailedProduct = z.infer<typeof DetailedProduct>;

export default Product;
