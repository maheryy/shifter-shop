import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/order.api";
import QueryKey from "@/types/query";

function useOrders() {
  return useQuery({
    queryKey: [QueryKey.enum.orders],
    queryFn: getOrders,
  });
}

export default useOrders;
