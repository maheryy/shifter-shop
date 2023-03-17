import { useEffect, useMemo, useState } from "react";
import StarEmptyIcon from "../assets/icons/star-empty.svg";
import StarFullIcon from "../assets/icons/star-full.svg";

const RatingPicker = ({ rating, onChange }: RatingPickerProps) => {
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const uid = useMemo(() => Math.random(), []);
  const choices = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className="flex text-yellow-400 -mx-0.5">
      {choices.map((value) => (
        <label
          key={`rp-label-${uid}-${value}`}
          htmlFor={`rating-${value}`}
          className="w-10 h-10 cursor-pointer px-0.5"
          onMouseOver={() => setRatingHover(value)}
          onMouseLeave={() => setRatingHover(null)}
        >
          {(ratingHover && ratingHover >= value) || rating >= value ? (
            <StarFullIcon />
          ) : (
            <StarEmptyIcon />
          )}
        </label>
      ))}
      <div className="hidden">
        {choices.map((value) => (
          <input
            key={`rp-input-${uid}-${value}`}
            name="rating"
            type="radio"
            id={`rating-${value}`}
            onChange={() => onChange(value)}
            checked={rating === value}
          />
        ))}
      </div>
    </div>
  );
};

interface RatingPickerProps {
  onChange: (rating: number) => void;
  rating: number;
}

export default RatingPicker;
