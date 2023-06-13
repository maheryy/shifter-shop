import { CreateReview, Review } from "@/types/review";
import api from ".";

export function getReviews(): Promise<Review[]> {
  // TODO: remove query params if not needed
  return api.get("/reviews?_expand=product").json();
}

export function createReview(review: CreateReview): Promise<Review> {
  return api.post(review, "/reviews").json();
}
