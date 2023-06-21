import { clearCart } from "services/cart.service";

export const onOrderCreated = async (data: OrderCreatedData) => {
  await clearCart(data.order.customer);
};

interface Order {
  id: string;
  customer: string;
  date: Date;
  reference: string;
  status: "Pending" | "Confirmed" | "Shipping" | "Delivered" | "Cancelled";
  amount: number;
  products: { id: string; quantity: number }[];
}

interface OrderCreatedData {
  order: Order;
}
