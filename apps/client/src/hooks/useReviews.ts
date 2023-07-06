import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/api/review.api";
import QueryKey from "@/types/query";

function useReviews() {
  return useQuery({
    queryKey: [QueryKey.enum.reviews],
    queryFn: getReviews,
  });
}

export default useReviews;
