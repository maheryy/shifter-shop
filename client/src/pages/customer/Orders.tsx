import { useEffect, useState } from "react";
import { Order } from "../../types/order";
import { getOrders } from "../../api/order.api";
import OrderCard from "../../components/account/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderCard key={order.reference} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
