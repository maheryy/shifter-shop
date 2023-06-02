import { Link } from "react-router-dom";
import Rating from "@/components/Rating";
import { Review } from "@/types/review";
import { formatDisplayDate } from "@/utils/format";

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex flex-col rounded shadow">
      <div className="flex rounded-t border-b border-gray-200 bg-gray-50">
        <div className="flex h-16 w-16 basis-16 items-center rounded-tl">
          <img
            alt={review.product.name}
            className="rounded-tl"
            src={review.product.image}
          />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden p-2 leading-7">
          <Link
            className="... truncate font-roboto font-medium text-gray-600"
            to={`/products/${review.product.id}`}
          >
            {review.product.name}
          </Link>
          <span className="text-xs text-gray-500">
            Reviewed on {formatDisplayDate(review.date)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        {review.details ? (
          <div className="pb-2 text-sm leading-7">{review.details}</div>
        ) : (
          <div className="py-2 text-xs italic">Aucun commentaire.</div>
        )}
        <div className="flex flex-1 items-end justify-end py-2">
          <Rating value={review.rating} />
        </div>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

export default ReviewCard;
