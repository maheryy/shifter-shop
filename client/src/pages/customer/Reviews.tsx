import { useEffect, useState } from "react";
import { getReviews } from "@/api/review.api";
import ReviewCard from "@/components/account/ReviewCard";
import { Review } from "@/types/review";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews()
      .then((reviews) => setReviews(reviews))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
