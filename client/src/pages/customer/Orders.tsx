import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "@/api/order.api";
import OrderCard from "@/components/account/OrderCard";
import DownloadProvider from "@/providers/DownloadProvider";
import { Order } from "@/types/order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <DownloadProvider>
      <section className="grid gap-8">
        <Link className="md:hidden" to="/account">
          &lt; Back
        </Link>
        {orders.map((order) => (
          <OrderCard key={order.reference} order={order} />
        ))}
      </section>
    </DownloadProvider>
  );
};

export default Orders;
