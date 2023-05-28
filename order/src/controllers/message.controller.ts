import { ConsumeMessage } from "amqplib";
import amqp, { Queue } from "lib/amqp";
import { createOrder, generateOrderReference } from "services/order.service";

export const onPaymentSucceeded = async (msg: ConsumeMessage) => {
  if (!msg) return;
  const data = JSON.parse(msg.content.toString());
  console.log(data);
  //   const reference = await generateOrderReference();

  //   const order = await createOrder({
  //     customerId,
  //     amount,
  //     reference,
  //     status: OrderStatus.Pending,
  //   });

  await amqp.publish(Queue.OrderCreated, {
    orderId: "test",
  });
};
