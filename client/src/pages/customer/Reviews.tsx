import { useEffect, useState } from "react";
import { Review } from "../../types/review";
import { getReviews } from "../../api/review.api";
import ReviewCard from "../../components/account/ReviewCard";

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
