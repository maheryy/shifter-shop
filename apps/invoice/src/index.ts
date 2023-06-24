import "config";
import express from "express";
import cors from "cors";
import invoiceRoutes from "routes/invoice";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(invoiceRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
