import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "@/api/review.api";
import QueryKey from "@/types/query";

function useReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review created successfully");

      queryClient.invalidateQueries([QueryKey.enum.reviews]);
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
