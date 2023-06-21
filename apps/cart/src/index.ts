import "config";
import express from "express";
import cors from "cors";
import cartRoutes from "routes/cart";
import amqp from "lib/amqp";
import { onOrderCreated } from "controllers/message.controller";
import { Queue } from "@shifter-shop/amqp";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => {
  console.log("[rabbitmq] AMQP initialized");
  amqp.defineConsumer(Queue.OrderCreated, onOrderCreated);
});

app.use(express.json());
app.use(cors());
app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
