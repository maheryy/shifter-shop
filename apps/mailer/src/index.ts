import "config";
import express from "express";
import cors from "cors";
import mailerRoutes from "routes/mailer";
import { onOrderCreated } from "controllers/message.controller";
import amqp from "lib/amqp";
import { Queue } from "@shifter-shop/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => {
  console.log("[rabbitmq] AMQP initialized");
  amqp.defineConsumer(Queue.OrderCreated, onOrderCreated);
});

app.use(express.json());
app.use(cors());
app.use(mailerRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
