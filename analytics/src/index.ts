import { startServer } from "config";
import express from "express";
import cors from "cors";
import analytics from "routes/analytics";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use("/analytics", analytics);

startServer(app);
