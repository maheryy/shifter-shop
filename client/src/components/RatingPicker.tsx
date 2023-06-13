import StarEmptyIcon from "@icons/star-empty.svg";
import StarFullIcon from "@icons/star-full.svg";
import { useCallback, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface RatingPickerFieldValues {
  rating: number;
}

interface RatingPickerProps {
  rating: number;
  register: UseFormRegister<RatingPickerFieldValues>;
}

const choices: readonly [1, 2, 3, 4, 5] = [1, 2, 3, 4, 5];

function RatingPicker({ rating, register }: RatingPickerProps) {
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const onBlurOrMouseLeave = useCallback(() => setRatingHover(null), []);

  return (
    <div className="flex gap-2 text-yellow-400">
      {choices.map((choice) => (
        <label
          className="grid w-10 cursor-pointer gap-2"
          htmlFor={`${choice}`}
          key={choice}
          onBlur={onBlurOrMouseLeave}
          onFocus={() => setRatingHover(choice)}
          onMouseLeave={onBlurOrMouseLeave}
          onMouseOver={() => setRatingHover(choice)}
        >
          {(ratingHover && ratingHover >= choice) || rating >= choice ? (
            <StarFullIcon />
          ) : (
            <StarEmptyIcon />
          )}
          <input
            className="absolute opacity-0"
            id={`${choice}`}
            type="radio"
            value={choice}
            {...register("rating")}
          />
        </label>
      ))}
    </div>
  );
}

export default RatingPicker;
