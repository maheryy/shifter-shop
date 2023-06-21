import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category.api";
import QueryKey from "@/types/query";

function useCategories() {
  return useQuery({
    queryKey: [QueryKey.enum.categories],
    queryFn: getCategories,
  });
}

export default useCategories;
