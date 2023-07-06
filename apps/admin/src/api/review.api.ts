import { EGlobalStatus, TFullReview } from "@shifter-shop/dictionary";
import api from ".";

export const getAllReviews = async (): Promise<TFullReview[]> => {
  return api.get("/reviews").json();
};

export const setReviewStatus = async (
  reviewId: string,
  status: EGlobalStatus
): Promise<void> => {
  return api.patch({ status }, `/reviews/${reviewId}`).res();
}