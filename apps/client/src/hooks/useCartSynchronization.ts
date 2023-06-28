import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { synchronizeCart } from "@/api/cart.api";
import { LocalCart } from "@/types/cart";
import QueryKey from "@/types/query";
import StorageKey from "@/types/storage";
import { getFromLocalStorage, removeFromLocalStorage } from "@/utils/storage";

function useCartSynchronization(isAuthenticated: boolean) {
  const queryClient = useQueryClient();

  const synchronizeMutation = useMutation({
    mutationFn: synchronizeCart,
    onSuccess: (cart: LocalCart) =>
      queryClient.setQueryData([QueryKey.enum.cart], cart),
  });

  useEffect(() => {
    const cart = getFromLocalStorage<LocalCart>(StorageKey.enum.cart);

    if (cart && isAuthenticated) {
      synchronizeMutation.mutate(cart);

      removeFromLocalStorage(StorageKey.enum.cart);
    }
  }, [isAuthenticated, synchronizeMutation]);
}

export default useCartSynchronization;