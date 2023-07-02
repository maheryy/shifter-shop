import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "@/api/review.api";

function useReview() {
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review created successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("Error creating review");
    },
  });
}

export default useReview;
