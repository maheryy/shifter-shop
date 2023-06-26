import "config";
import express from "express";
import cors from "cors";
import cartRoutes from "routes/cart";
import amqp from "lib/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cartRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`[Cart] Server started at http://localhost:${PORT}`);
  amqp.connect();
});
