import { TOrderCreatedData } from "@shifter-shop/amqp";

export const onOrderCreated = async (order: TOrderCreatedData) => {
  // await clearCart(data.order.customer);
  console.log("[cart] Order created", order);
};
