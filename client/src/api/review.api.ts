import { Review } from "@/types/review";
import api from ".";

export const getReviews = async (): Promise<Review[]> => {
  // TODO: remove query params if not needed
  return api.get("/reviews?_expand=product").json();
};
