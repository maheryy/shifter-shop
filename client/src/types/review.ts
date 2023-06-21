import { z } from "zod";
import Product from "./product";

const Review = z.object({
  id: z.number(),
  rating: z.number(),
  date: z.string(),
  title: z.string().optional(),
  details: z.string().optional(),
  authorId: z.number(),
  product: Product,
  orderId: z.number(),
});

const CreateReview = Review.pick({ rating: true, title: true, details: true });

export type Review = z.infer<typeof Review>;
export type CreateReview = z.infer<typeof CreateReview>;

export default Review;
