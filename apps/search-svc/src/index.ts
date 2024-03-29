import "config";
import express from "express";
import cors from "cors";
import searchRoutes from "routes/search";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(searchRoutes);
app.use(exceptionHandler);

app.listen(PORT, () => {
  console.log(`[Search] Server started at http://localhost:${PORT}`);
});
