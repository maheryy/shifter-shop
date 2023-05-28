import { config } from "dotenv";
config();
import db from "database";

db.initialize()
  .then(() => console.log("[database] Database initialized"))
  .catch((err) =>
    console.error("[database] Error during initialization :", err)
  );
