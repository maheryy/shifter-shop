import express from "express";
import cors from "cors";
import { Registry } from "@shifter-shop/registry";
import { registerRoutes } from "utils/proxy";
import helmet from "helmet";
import healthCheck from "routes/health";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(healthCheck);
app.use(registerRoutes(Registry.getServices()));

app.listen(PORT, () => {
  console.log(
    `\x1b[32m[API Gateway] Server started at http://localhost:${PORT}\x1b[0m`
  );
});
