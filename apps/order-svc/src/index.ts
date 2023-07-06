import "config";
import express from "express";
import cors from "cors";
import orderRoutes from "routes/order";
import amqp from "lib/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(orderRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`[Order] Server started at http://localhost:${PORT}`);
  amqp.connect();
});
