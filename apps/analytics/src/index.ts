import { startServer } from "config";
import express from "express";
import cors from "cors";
import analyticsRoutes from "routes/analytics";
import tracker from "middlewares/tracker";
import trackerConfig from "config/tracker";
import { exceptionHandler } from "@shifter-shop/errors";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use(tracker(trackerConfig));
app.use(analyticsRoutes);
app.use(exceptionHandler);

startServer(app);
