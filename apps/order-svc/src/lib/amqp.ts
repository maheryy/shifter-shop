import { AMQP, EExchange } from "@shifter-shop/amqp";
import { onPaymentSucceeded } from "controllers/message.controller";

const amqp = new AMQP(process.env.AMQP_URL!);
amqp.registerExchange(EExchange.PaymentSuccess, onPaymentSucceeded);

export default amqp;
