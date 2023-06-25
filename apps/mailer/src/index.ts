import "config";
import express from "express";
import cors from "cors";
import mailerRoutes from "routes/mailer";
import amqp, { defineAMQPListeners } from "lib/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(mailerRoutes);
app.use(exceptionHandler);

defineAMQPListeners();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  amqp.connect();
});
