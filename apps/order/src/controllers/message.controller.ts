import { Queue } from "@shifter-shop/amqp";
import { PaymentSuccessData } from "types/message";
import { createOrder } from "./order.controller";
import amqp from "lib/amqp";
import { EOrderStatus } from "@shifter-shop/types";

export const onPaymentSucceeded = async (data: PaymentSuccessData) => {
  const order = await createOrder({
    customerId: data.customerId,
    amount: data.amount,
    products: data.products,
    status: EOrderStatus.Confirmed,
  });

  amqp.publish(Queue.OrderCreated, { order });
  console.log("Order created", order);
};
