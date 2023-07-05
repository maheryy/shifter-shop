import {
  TFullReview,
} from "@shifter-shop/dictionary";
import StarIcon from "@icons/star.svg";

const ModalReview = ({ review }: ModalReviewProps) => {
  let date = new Date(review.date);

  let stars = [];

  let filledStars = review.rating;

  for (let i = 0; i < 5; i++) {
    if (filledStars > 0) {
      stars.push(<StarIcon key={i} className="inline-block w-7 h-7 text-purple-600" />);
      filledStars--;
    } else {
      stars.push(<StarIcon key={i} className="inline-block w-7 h-7 text-gray-400" />);
    }
  }

  return (
    <>
      <p className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">
        {review.title}
      </p>
      <p className="mt-2 mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        {stars}
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-400">
        {review.details}
      </p>
      <div className="border-t-4 pt-4 mt-4 text-lg text-gray-700 dark:text-gray-400">
        <p><strong>Product:</strong> {review.product.name}</p>
        <p><strong>Published by:</strong> {review.author.firstname} {review.author.lastname} ({review.author.email})</p>
        <p><strong>Status:</strong> {review.status}</p>
        <p><strong>Published on:</strong> {date.toLocaleDateString()} at {date.toLocaleTimeString()}</p>
      </div>
    </>
  );
}

interface ModalReviewProps {
  review: TFullReview;
}

export default ModalReview;