import { Link } from "react-router-dom";
import { getReviews } from "@/api/review.api";
import ReviewCard from "@/components/account/ReviewCard";
import { useData } from "@/hooks/useData";
import { Loader } from "@/types/loader";
import { Review } from "@/types/review";

export const reviewsLoader: Loader<Review[]> = async () => {
  return getReviews();
};

const Reviews = () => {
  const reviews = useData<Review[]>();

  return (
    <section className="grid gap-8 md:grid-cols-2">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
};

export default Reviews;
