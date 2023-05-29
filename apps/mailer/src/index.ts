import "config";
import express from "express";
import cors from "cors";
import mailer from "routes/mailer";
import amqp from "lib/amqp";
import { Queue } from "types/message";
import { onOrderCreated } from "controllers/message.controller";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => {
  console.log("[rabbitmq] AMQP initialized");
  amqp.defineConsumer(Queue.OrderCreated, onOrderCreated);
});

app.use(express.json());
app.use(cors());
app.use(mailer);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
