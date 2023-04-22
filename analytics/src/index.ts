import "config";
import express from "express";
import cors from "cors";
import analytics from "routes/analytics";

const PORT = process.env.PORT || 3000;
const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use("/analytics", analytics);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
