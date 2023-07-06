import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "@/api/product.api";
import { Product } from "@/types/product";
import QueryKey from "@/types/query";

export function useProduct(productId: Product["id"]) {
  return useQuery({
    queryKey: [QueryKey.enum.products, productId],
    queryFn: () => getProduct(productId),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast.success("Product updated");

      queryClient.setQueryData([QueryKey.enum.products, data.id], data);

      queryClient.invalidateQueries([QueryKey.enum.products]);
    },

    onError: () => {
      toast.error("Error updating product");
    },
  });
}
