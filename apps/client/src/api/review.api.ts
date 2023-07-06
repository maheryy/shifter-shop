import { CreateReview, Review } from "@/types/review";
import api from ".";

export function getReviews(): Promise<Review[]> {
  return api.get("/reviews").json();
}

export function createReview(review: CreateReview): Promise<Review> {
  return api.post(review, "/reviews").json();
}
