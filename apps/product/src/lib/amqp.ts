import { AMQP, EExchange } from '@shifter-shop/amqp';
import { MessageController } from 'src/message/message.controller';

const amqp = new AMQP(process.env.AMQP_URL!);

amqp.registerExchange(
  EExchange.ReviewCreated,
  MessageController.onReviewCreated,
);

export default amqp;
