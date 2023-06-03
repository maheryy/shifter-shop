import "config";
import express from "express";
import cors from "cors";
import orderRoutes from "routes/order";
import { onPaymentSucceeded } from "controllers/message.controller";
import amqp from "lib/amqp";
import { Queue } from "@shifter-shop/amqp";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => {
  console.log("[rabbitmq] AMQP initialized");
  amqp.defineConsumer(Queue.PaymentSuccess, onPaymentSucceeded);
});

app.use(express.json());
app.use(cors());
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
