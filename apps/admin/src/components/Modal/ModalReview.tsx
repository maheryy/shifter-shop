import {
  TFullReview,
} from "@shifter-shop/dictionary";

const ModalReview = ({ review }: ModalReviewProps) => {
  let date = new Date(review.date);

  return (
    <>
      {/* Modal title */}
      <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {review.title}
      </p>
      {/* Modal details */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {review.details}
      </p>
      {/* Modal rating */}
      <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
        Rating: {review.rating}
      </p>
      {/* Modal product */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Product: {review.product.name}
      </p>
      {/* Modal author */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Author: {review.author.firstname}
      </p>
      {/* Modal status */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Status: {review.status}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Published on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
      </p>
    </>
  );
}

interface ModalReviewProps {
  review: TFullReview;
}

export default ModalReview;