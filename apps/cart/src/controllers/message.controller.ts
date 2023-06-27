import { TOrderCreatedData } from "@shifter-shop/amqp";
import { clearCart } from "services/cart.service";

export const onOrderCreated = async (order: TOrderCreatedData) => {
  await clearCart(order.customerId);
  console.log("[cart] Order created", order);
};
