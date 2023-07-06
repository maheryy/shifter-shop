import { AMQP, EExchange, EQueue } from "@shifter-shop/amqp";
import {
  onOrderCreated,
  onOrderStatusChanged,
  onPaymentSuccess,
  onReviewCreated,
  onUserPasswordChanged,
  onUserPasswordReset,
  onUserRegistered,
} from "controllers/message.controller";

const amqp = new AMQP(process.env.AMQP_URL!);

amqp.registerExchange(EExchange.OrderCreated, onOrderCreated);
amqp.registerExchange(EExchange.PaymentSuccess, onPaymentSuccess);
amqp.registerExchange(EExchange.ReviewCreated, onReviewCreated);
amqp.registerQueue(EQueue.OrderStatusChanged, onOrderStatusChanged);
amqp.registerQueue(EQueue.UserPasswordChanged, onUserPasswordChanged);
amqp.registerQueue(EQueue.UserPasswordReset, onUserPasswordReset);
amqp.registerQueue(EQueue.UserRegistered, onUserRegistered);

export default amqp;
