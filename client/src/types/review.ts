import { z } from "zod";

const Review = z.object({
  id: z.number(),
  rating: z.number(),
  title: z.string().optional(),
  details: z.string().optional(),
  authorId: z.number(),
  productId: z.number(),
  orderId: z.number(),
});

const CreateReview = Review.pick({ rating: true, title: true, details: true });

export type Review = z.infer<typeof Review>;
export type CreateReview = z.infer<typeof CreateReview>;

export default Review;
