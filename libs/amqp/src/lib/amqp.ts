import amqplib, { Channel, Connection, ConsumeMessage } from "amqplib";
import { Queue } from "../types/queue";

export class AMQP {
  private connection: Connection;
  private channel: Channel;
  private connectionString: string;
  constructor(url: string) {
    this.connectionString = url;
  }

  async connect() {
    if (this.channel) {
      return this.channel;
    }
    this.connection = await amqplib.connect(this.connectionString);
    this.channel = await this.connection.createChannel();

    return this.channel;
  }

  async defineConsumer<T>(queue: Queue, callback: (data: T) => void) {
    await this.channel.assertQueue(queue);
    await this.channel.consume(queue, (message) => {
      if (!message) {
        return console.error(
          `[rabbitmq] Error : No message content on ${queue}`
        );
      }
      const data = JSON.parse(message.content.toString());
      callback(data);
      this.channel.ack(message);
    });

    console.log(`[rabbitmq] queue ${queue} is ready to receive messages`);
  }

  async publish<T>(queue: Queue, data: T) {
    await this.channel.assertQueue(queue);
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }

  ack(message: ConsumeMessage) {
    return this.channel.ack(message);
  }

  get getChannel() {
    return this.channel;
  }

  get getConnection() {
    return this.connection;
  }
}
