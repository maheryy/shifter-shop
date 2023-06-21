import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as cartApi from "@/api/cart.api";
import * as cartLocal from "@/core/cart.local";
import { LocalCart } from "@/types/cart";
import QueryKey from "@/types/query";
import { useAuthContext } from "./context";

export type UseCart = ReturnType<typeof useCart>;

function useCart<T = LocalCart>(select?: (data: LocalCart) => T) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthContext();

  const cartQuery = useQuery({
    queryKey: [QueryKey.enum.cart],
    queryFn: isAuthenticated ? cartApi.getCart : cartLocal.getCart,
    select,
  });

  function onSuccess(cart: LocalCart) {
    queryClient.setQueryData([QueryKey.enum.cart], cart);
  }

  const addMutation = useMutation({
    mutationFn: isAuthenticated
      ? cartApi.addProductToCart
      : cartLocal.addProductToCart,
    onSuccess,
  });

  const removeMutation = useMutation({
    mutationFn: isAuthenticated
      ? cartApi.removeProductFromCart
      : cartLocal.removeProductFromCart,
    onSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: isAuthenticated
      ? cartApi.updateProductQuantity
      : cartLocal.updateProductQuantity,
    onSuccess,
  });

  return {
    cartQuery,
    addMutation,
    removeMutation,
    updateMutation,
  };
}

export function useProductQuantity() {
  return useCart(({ products }) =>
    products.reduce((acc, { quantity }) => acc + quantity, 0),
  );
}

export function useCartProducts() {
  return useCart(({ products }) => products);
}

export default useCart;
