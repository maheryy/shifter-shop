import { Order } from "../../types/order";
import { formatDisplayDate, formatPrice } from "../../utils/format";
import OrderProductCard from "./OrderProductCard";

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="border border-gray-200 rounded">
      <div className="bg-gray-50 py-3 px-6 border-b border-gray-200 rounded-t grid grid-cols-10 gap-4 text-gray-600 text-sm">
        <div className="col-span-3 flex flex-col">
          <span className="uppercase font-medium">
            Order #{order.reference}
          </span>
          <span>{formatDisplayDate(order.date)}</span>
        </div>
        <div className="col-span-3 flex flex-col">
          <span className="uppercase font-medium">Status</span>
          <span className="capitalize">{order.status}</span>
        </div>
        <div className="col-span-4 flex flex-col items-end">
          <span className="uppercase font-medium">Total</span>
          <span>{formatPrice(order.totalAmount)}</span>
        </div>
      </div>
      <div className="bg-white rounded-b">
        <div className="flex flex-col divide-y-[1px] divide-gray-200">
          {order.products.map((product) => (
            <OrderProductCard
              key={`${order.reference}_${product.id}`}
              product={product}
              orderId={order.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: Order;
}

export default OrderCard;
