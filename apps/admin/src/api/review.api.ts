import { TFullReview } from "@shifter-shop/dictionary";
import api from ".";

export const getAllReviews = async (): Promise<TFullReview[]> => {
  return api.get("/reviews").json();
};
