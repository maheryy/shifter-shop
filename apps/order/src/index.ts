import "config";
import express from "express";
import cors from "cors";
import order from "routes/order";
import { onPaymentSucceeded } from "controllers/message.controller";
import { Queue } from "types/message";
import amqp from "@shifter-shop/amqp";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => {
  console.log("[rabbitmq] AMQP initialized");
  amqp.defineConsumer(Queue.PaymentSuccess, onPaymentSucceeded);
});

app.use(express.json());
app.use(cors());
app.use("/orders", order);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
