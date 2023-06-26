import "config";
import express from "express";
import cors from "cors";
import paymentRoutes from "routes/payment";
import amqp from "lib/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: (req, res, buffer) => (req.rawBody = buffer) }));
app.use(cors());
app.use(paymentRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  amqp.connect();
});
