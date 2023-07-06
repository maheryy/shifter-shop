import { TOrderCreatedData } from "@shifter-shop/amqp";

export const onOrderCreated = async (order: TOrderCreatedData) => {
  console.log("[inventory] Order created", order);
};
