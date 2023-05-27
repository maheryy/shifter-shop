import "config";
import express from "express";
import cors from "cors";
import invoice from "routes/invoice";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/invoice", invoice);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
