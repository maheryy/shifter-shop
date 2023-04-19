import StarFull from "@icons/star-full.svg";
import StarEmpty from "@icons/star-empty.svg";
import StarHalf from "@icons/star-half.svg";
import { useMemo } from "react";

const Rating = ({ value, size = "md" }: RatingProps) => {
  const uid = useMemo(() => Math.random(), []);
  const sizeClass = size === "md" ? "w-6 h-6" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1 text-yellow-400 relative">
      {[...Array(5)].map((_, index) => {
        const rating = index + 1;
        const Star =
          value >= rating
            ? StarFull
            : value < rating && value >= rating - 0.5
            ? StarHalf
            : StarEmpty;
        return (
          <span
            className={`${sizeClass} relative bottom-[1px]`}
            key={`star-${uid}-${index}`}
          >
            <Star />
          </span>
        );
      })}
    </div>
  );
};

interface RatingProps {
  value: number;
  size?: "sm" | "md";
}

export default Rating;
