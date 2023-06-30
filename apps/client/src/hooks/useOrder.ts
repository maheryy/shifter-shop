import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/api/order.api";
import type { Order } from "@/types/order";
import QueryKey from "@/types/query";

export function useOrder(orderId: Order["id"]) {
  return useQuery({
    queryKey: [QueryKey.enum.orders, orderId],
    queryFn: () => getOrder(orderId),
  });
}
