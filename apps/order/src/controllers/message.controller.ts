import { EExchange, TPaymentSuccessData } from "@shifter-shop/amqp";
import { createOrder } from "./order.controller";
import amqp from "lib/amqp";
import { EOrderStatus } from "@shifter-shop/dictionary";

export const onPaymentSucceeded = async (payment: TPaymentSuccessData) => {
  console.log("[order] Payment succeeded", payment);
  const order = await createOrder({
    customerId: payment.customerId,
    amount: payment.amount,
    products: payment.products,
    status: EOrderStatus.Confirmed,
  });

  amqp.publishToExchange(EExchange.OrderCreated, order);
};
