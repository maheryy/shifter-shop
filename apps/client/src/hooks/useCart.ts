import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as cartApi from "@/api/cart.api";
import * as cartLocal from "@/core/cart.local";
import { Cart } from "@/types/cart";
import QueryKey from "@/types/query";
import { useAuthContext } from "./context";

export type UseCart = ReturnType<typeof useCart>;

function useCart<T = Cart>(select?: (data: Cart) => T) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthContext();

  const cartQuery = useQuery({
    queryKey: [QueryKey.enum.cart],
    queryFn: isAuthenticated ? cartApi.getCart : cartLocal.getCart,
    select,
  });

  function onSuccess(cart: Cart) {
    queryClient.setQueryData([QueryKey.enum.cart], cart);
  }

  const updateMutation = useMutation({
    mutationFn: isAuthenticated
      ? cartApi.updateProductQuantity
      : cartLocal.updateProductQuantity,
    onSuccess,
  });

  return {
    cartQuery,
    updateMutation,
  };
}

export function useProductQuantity() {
  return useCart((cartProduct) => {
    return cartProduct.reduce((acc, { quantity }) => acc + quantity, 0);
  });
}

export function useQuantity(productId: string) {
  const { cartQuery } = useCart((cart) => {
    const cartProduct = cart.find(
      (cartProduct) => cartProduct.product.id === productId,
    );

    return cartProduct?.quantity ?? 0;
  });

  return cartQuery;
}

export default useCart;
