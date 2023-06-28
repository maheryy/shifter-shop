import { AMQP, EExchange } from "@shifter-shop/amqp";
import { onOrderCreated } from "controllers/message.controller";

const amqp = new AMQP(process.env.AMQP_URL!);
amqp.registerExchange(EExchange.OrderCreated, onOrderCreated);

export default amqp;
