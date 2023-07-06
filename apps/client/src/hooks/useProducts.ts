import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProducts, GetProductsResponse } from "@/api/product.api";
import { ProductsSearchParams } from "@/types/params";
import QueryKey from "@/types/query";

function useProducts(
  searchParams?: ProductsSearchParams & { sellerId?: string },
  options: UseQueryOptions<GetProductsResponse> = {},
) {
  return useQuery({
    queryKey: [QueryKey.enum.products, searchParams],
    queryFn: () => getProducts(searchParams),
    ...options,
  });
}

export default useProducts;
