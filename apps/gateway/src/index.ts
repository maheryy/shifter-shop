import express from "express";
import { Registry } from "@shifter-shop/registry";
import { registerRoutes } from "utils/proxy";
const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(registerRoutes(Registry.getServices()));

app.listen(PORT, () => {
  console.log(`API Gateway started at http://localhost:${PORT}`);
});
