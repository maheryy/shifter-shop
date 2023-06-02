import StarEmptyIcon from "@icons/star-empty.svg";
import StarFullIcon from "@icons/star-full.svg";
import { useMemo, useState } from "react";

const RatingPicker = ({ rating, onChange }: RatingPickerProps) => {
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const uid = useMemo(() => Math.random(), []);
  const choices = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className="-mx-0.5 flex text-yellow-400">
      {choices.map((value) => (
        <label
          className="h-10 w-10 cursor-pointer px-0.5"
          htmlFor={`rating-${value}`}
          key={`rp-label-${uid}-${value}`}
          onMouseLeave={() => setRatingHover(null)}
          onMouseOver={() => setRatingHover(value)}
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
            checked={rating === value}
            id={`rating-${value}`}
            key={`rp-input-${uid}-${value}`}
            name="rating"
            onChange={() => onChange(value)}
            type="radio"
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
