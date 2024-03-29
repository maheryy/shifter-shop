import "config";
import express from "express";
import cors from "cors";
import mailerRoutes from "routes/mailer";
import amqp from "lib/amqp";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(mailerRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`[Mailer] Server started at http://localhost:${PORT}`);
  amqp.connect();
});
