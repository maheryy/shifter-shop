import amqplib, { Channel, Connection } from "amqplib";
import { EQueue, TQueueMapping } from "../types/queue";
import { EExchange, TExchangeMapping } from "../types/exchange";
import { RECONNECTION_ATTEMPTS, RECONNECTION_DELAY } from "./constants";
import Storage, { ExchangeStorage, QueueStorage } from "./storage";

export class AMQP {
  private connection: Connection;
  private channel: Channel;
  private connectionString: string;
  private options: Required<AMQPOptions>;
  private queueStorage = new Storage<QueueStorage>();
  private exchangeStorage = new Storage<ExchangeStorage>();

  constructor(url: string, options?: AMQPOptions) {
    this.connectionString = url;
    this.options = { retryAttempts: 10, retryDelay: 5000, ...options };
  }

  async connect() {
    if (this.channel) {
      return;
    }

    try {
      await this.initConnection();
    } catch (error) {
      console.error(
        `[rabbitmq] Connection failed: ${(error as Error).message}`
      );
      await this.retryConnection(
        this.options.retryAttempts,
        this.options.retryDelay
      );
    }
  }

  registerQueue<Q extends EQueue>(
    queue: Q,
    callback: (data: TQueueMapping[Q]) => Promise<void>
  ) {
    return this.queueStorage.save({ name: queue, callback: callback as never });
  }

  registerExchange<E extends EExchange>(
    queue: E,
    callback: (data: TExchangeMapping[E]) => Promise<void>
  ) {
    return this.exchangeStorage.save({
      name: queue,
      callback: callback as never,
    });
  }

  async publishToQueue<Q extends EQueue>(queue: Q, data: TQueueMapping[Q]) {
    try {
      await this.channel.assertQueue(queue);
      return this.channel.sendToQueue(queue, this.bufferize(data));
    } catch (error) {
      console.error(
        `[rabbitmq] Unable to publish to queue ${queue}: ${
          (error as Error).message
        }`
      );
      return false;
    }
  }

  async publishToExchange<E extends EExchange>(
    exchange: E,
    data: TExchangeMapping[E]
  ) {
    try {
      await this.channel.assertExchange(exchange, "fanout", { durable: false });
      return this.channel.publish(exchange, "", this.bufferize(data));
    } catch (error) {
      console.error(
        `[rabbitmq] Unable to publish to exchange ${exchange}: ${
          (error as Error).message
        }`
      );
      return false;
    }
  }

  private async listen() {
    const queues = this.queueStorage
      .getAll()
      .map(({ name, callback }) => this.subscribeToQueue(name, callback));

    const exchanges = this.exchangeStorage
      .getAll()
      .map(({ name, callback }) => this.subscribeToExchange(name, callback));

    await Promise.all([...queues, ...exchanges]);
  }

  private async initConnection() {
    this.connection = await amqplib.connect(this.connectionString);
    this.channel = await this.connection.createChannel();
    this.channel.on("close", () => {
      console.warn("[AMQP] Channel closed, retrying in 10s...");
      setTimeout(
        () => this.retryConnection(RECONNECTION_ATTEMPTS, RECONNECTION_DELAY),
        10000
      );
    });

    if (!this.queueStorage.isEmpty() || !this.exchangeStorage.isEmpty()) {
      await this.listen();
    }

    console.log("[rabbitmq] Connected successfully");
  }

  private async retryConnection(attempts: number, delay: number) {
    let attempt = 1;
    while (attempt < attempts) {
      try {
        return await this.initConnection();
      } catch (error) {
        attempt++;
        console.error(`[rabbitmq] Retry failed: ${(error as Error).message}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error(
      "[rabbitmq] Max connection attempts reached. Unable to connect"
    );
  }

  private async subscribeToQueue(
    queue: EQueue,
    callback: (data: Record<string, unknown>) => Promise<void>
  ) {
    try {
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
    } catch (error) {
      console.error(
        `[rabbitmq] Unable to subscribe to queue ${queue}: ${
          (error as Error).message
        }`
      );
    }
  }

  private async subscribeToExchange(
    exchange: EExchange,
    callback: (data: Record<string, unknown>) => Promise<void>
  ) {
    try {
      await this.channel.assertExchange(exchange, "fanout", { durable: false });
      const queue = await this.channel.assertQueue("", { exclusive: true });
      await this.channel.bindQueue(queue.queue, exchange, "");
      await this.channel.consume(queue.queue, (message) => {
        if (!message) {
          return console.error(
            `[rabbitmq] Error: No message content on exchange ${exchange}`
          );
        }
        const data = JSON.parse(message.content.toString());
        callback(data).then(() => this.channel.ack(message));
      });

      console.log(`[rabbitmq] Subscribed to exchange ${exchange}`);
    } catch (error) {
      console.error(
        `[rabbitmq] Unable to subscribe to exchange ${exchange}: ${
          (error as Error).message
        }`
      );
    }
  }

  private bufferize<T>(data: T) {
    return Buffer.from(JSON.stringify(data));
  }
}
export interface AMQPOptions {
  retryAttempts?: number;
  retryDelay?: number;
}
