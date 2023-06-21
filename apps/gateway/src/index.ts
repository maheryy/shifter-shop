import express from "express";
import { Registry } from "@shifter-shop/registry";
import { registerRoutes } from "utils/proxy";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(registerRoutes(Registry.getServices()));

app.listen(PORT, () => {
  console.log(
    `\x1b[32m[API Gateway] Server started at http://localhost:${PORT}\x1b[0m`
  );
});
