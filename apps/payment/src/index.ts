import "config";
import express from "express";
import cors from "cors";
import payment from "routes/payment";
import amqp from "lib/amqp";

const app = express();
const PORT = process.env.PORT || 3000;

amqp.connect().then(() => console.log("[rabbitmq] AMQP initialized"));
app.use(express.json({ verify: (req, res, buffer) => (req.rawBody = buffer) }));
app.use(cors());
app.use("/payment", payment);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
