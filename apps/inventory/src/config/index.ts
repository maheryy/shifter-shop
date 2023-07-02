import { config } from "dotenv";
config();
import db from "database";
import { logger } from "@shifter-shop/logger";

db.initialize()
  .then(() => logger.info("[inventory][database] Database initialized"))
  .catch((err) => {
    logger.error("[inventory][database] Error during initialization :", err);
    process.exit(1);
  });
