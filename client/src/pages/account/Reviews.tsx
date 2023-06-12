import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "@/api/review.api";
import ReviewCard from "@/components/account/ReviewCard";
import { Review } from "@/types/review";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews().then(setReviews).catch(console.error);
  }, []);

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
