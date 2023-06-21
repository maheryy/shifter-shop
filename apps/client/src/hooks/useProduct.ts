import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/product.api";
import { Product } from "@/types/product";
import QueryKey from "@/types/query";

function useProduct(productId: Product["id"]) {
  return useQuery({
    queryKey: [QueryKey.enum.products, productId],
    queryFn: () => getProduct(productId),
  });
}

export default useProduct;
