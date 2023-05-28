import "config";
import express from "express";
import cors from "cors";
import order from "routes/order";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/orders", order);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
