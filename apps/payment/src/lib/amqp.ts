import { AMQP } from "@shifter-shop/amqp";

const amqp = new AMQP(process.env.AMQP_URL!);

export default amqp;
