import { Link } from "react-router-dom";
import Rating from "@/components/Rating";
import { Review } from "@/types/review";
import { formatDisplayDate } from "@/utils/format";

const ReviewCard = ({ review }: ReviewCardProps) => {
  const to = `/products/${review.product.id}`;

  return (
    <article className="grid rounded shadow">
      <div className="flex rounded-t border-b border-gray-200 bg-gray-50">
        <Link to={to}>
          <img
            alt={review.product.name}
            className="flex h-16 w-16 basis-16 items-center rounded-tl"
            src={review.product.image}
          />
        </Link>
        <div className="grid overflow-hidden p-2">
          <Link
            className="truncate font-roboto font-medium text-gray-600"
            to={to}
          >
            {review.product.name}
          </Link>
          <span className="text-xs text-gray-500">
            Reviewed on {formatDisplayDate(review.date)}
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-4">
        {review.details ? (
          <div className="text-sm leading-8">{review.details}</div>
        ) : (
          <div className="text-xs italic">No comments</div>
        )}
        <div className="flex flex-1 items-end justify-end py-2">
          <Rating value={review.rating} />
        </div>
      </div>
    </article>
  );
};

interface ReviewCardProps {
  review: Review;
}

export default ReviewCard;
