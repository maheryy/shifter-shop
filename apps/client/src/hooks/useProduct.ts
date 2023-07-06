import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProduct, getProduct, updateProduct } from "@/api/product.api";
import { TProduct } from "@/types/product";
import QueryKey from "@/types/query";

export function useProduct(productId: TProduct["id"]) {
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

    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("An error occurred while updating product");
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success("Product created");

      queryClient.setQueryData([QueryKey.enum.products, data.id], data);

      queryClient.invalidateQueries([QueryKey.enum.products]);
    },

    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("An error occurred while creating the product");
    },
  });
}
