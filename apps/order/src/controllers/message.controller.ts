import { PaymentSuccessData, Queue } from "types/message";
import { OrderStatus } from "types/order";
import { createOrder } from "./order.controller";
import amqp from "@shifter-shop/amqp";

export const onPaymentSucceeded = async (data: PaymentSuccessData) => {
  const order = await createOrder({
    customer: data.customer,
    amount: data.amount,
    products: data.products,
    status: OrderStatus.Confirmed,
  });

  amqp.publish(Queue.OrderCreated, { order });
  console.log("Order created", order);
};
