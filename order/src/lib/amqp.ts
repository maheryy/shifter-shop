import amqplib, { Channel, Connection, ConsumeMessage } from "amqplib";

export enum Queue {
  OrderCreated = "order:created",
  PaymentSuccess = "payment:success",
}

export class AMQP {
  private connection: Connection;
  private channel: Channel;

  private static instance: AMQP;

  private constructor() {}

  public static getInstance(): AMQP {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new AMQP();

    return this.instance;
  }

  async connect() {
    if (this.channel) {
      return this.channel;
    }
    this.connection = await amqplib.connect(process.env.AMQP_URL!);
    this.channel = await this.connection.createChannel();

    return this.channel;
  }

  async defineConsumer(
    queue: Queue,
    callback: (message: ConsumeMessage) => void
  ) {
    await this.channel.assertQueue(queue);
    await this.channel.consume(queue, (message) => {
      if (!message) {
        return console.error(
          `[rabbitmq] Error : No message content on ${queue}`
        );
      }
      callback(message);
      this.channel.ack(message);
    });

    console.log(`[rabbitmq] queue ${queue} is ready to receive messages`);
  }

  async publish(queue: Queue, data: Record<string, any>) {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }

  ack(message: ConsumeMessage) {
    this.channel.ack(message);
  }
}

const amqp = AMQP.getInstance();

export default amqp;
