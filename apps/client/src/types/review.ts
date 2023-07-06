import { z } from "zod";
import Order from "./order";
import Product from "./product";
import User from "./user";

const Review = z.object({
  id: z.string().uuid(),
  rating: z.number(),
  date: z.string(),
  title: z.string().optional(),
  details: z.string().optional(),
  author: User,
  product: Product,
  order: Order,
});

const CreateReview = Review.pick({
  rating: true,
  title: true,
  details: true,
}).extend({
  productId: Product.shape.id,
  orderId: Order.shape.id,
});

export type Review = z.infer<typeof Review>;
export type CreateReview = z.infer<typeof CreateReview>;

export default Review;
