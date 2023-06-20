import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product.api";
import { ProductsSearchParams } from "@/types/params";
import QueryKey from "@/types/query";

function useProducts(searchParams?: ProductsSearchParams) {
  return useQuery({
    queryKey: [QueryKey.enum.products, searchParams],
    queryFn: () => getProducts(searchParams),
  });
}

export default useProducts;
