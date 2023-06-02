import reviews from "@data/reviews.json";
import { getShuffledProducts } from "@/api/product.api";
import { Review } from "@/types/review";

export const getReviews = async (): Promise<Review[]> => {
  const res = reviews as Review[];

  return res.map((review: Review) => ({
    ...review,
    product: getShuffledProducts(1)[0],
  }));
};
