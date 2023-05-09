import { startServer } from "config";
import express from "express";
import cors from "cors";
import analytics from "routes/analytics";
import tracker from "middlewares/tracker";
import trackerConfig from "config/tracker";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use(tracker(trackerConfig));
app.use(analytics);

startServer(app);
