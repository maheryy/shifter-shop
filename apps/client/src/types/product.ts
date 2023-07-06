import { z } from "zod";
import Category from "./category";
import Review from "./review";
import User from "./user";

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
  seller: User,
});

const CreateProduct = Product.pick({
  name: true,
  price: true,
  categoryId: true,
}).extend({
  description: z.string().optional(),
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
export type TCreateProduct = z.infer<typeof CreateProduct>;

export default Product;
