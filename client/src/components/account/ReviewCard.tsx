import { Link } from "react-router-dom";
import { Review } from "../../types/review";
import Rating from "../Rating";
import { formatDisplayDate } from "../../utils/format";

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="shadow rounded flex flex-col">
      <div className="flex rounded-t border-b border-gray-200 bg-gray-50">
        <div className="basis-16 w-16 h-16 flex items-center rounded-tl">
          <img
            className="rounded-tl"
            src={review.product.image}
            alt={review.product.name}
          />
        </div>
        <div className="p-2 flex flex-col flex-1 leading-7 overflow-hidden">
          <Link
            className="text-gray-600 font-roboto font-medium truncate ..."
            to={`/products/${review.product.id}`}
          >
            {review.product.name}
          </Link>
          <span className="text-xs text-gray-500">
            Reviewed on {formatDisplayDate(review.date)}
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col">
        {review.details ? (
          <div className="text-sm leading-7 pb-2">{review.details}</div>
        ) : (
          <div className="text-xs italic py-2">Aucun commentaire.</div>
        )}
        <div className="flex justify-end items-end flex-1 py-2">
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
