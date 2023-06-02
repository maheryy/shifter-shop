import { useEffect, useState } from "react";
import { getOrders } from "@/api/order.api";
import OrderCard from "@/components/account/OrderCard";
import DownloadProvider from "@/providers/DownloadProvider";
import { Order } from "@/types/order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DownloadProvider>
      <div>
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <OrderCard key={order.reference} order={order} />
          ))}
        </div>
      </div>
    </DownloadProvider>
  );
};

export default Orders;
