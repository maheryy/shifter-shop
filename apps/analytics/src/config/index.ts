import { Express } from "express";
import { config } from "dotenv";
config();

let attempts = 0;
const MAX_ATTEMPTS = 3;
const ATTEMPTS_DELAY = 3000;

export const startServer = async (
  server: Express,
  onServerStarted?: () => void
) => {
  // Try MongoDB connection before starting the server
  const Mongo = (await import("database/Mongo")).default;

  try {
    console.log("Attempting to connect to MongoDB");
    await Mongo.getInstance().init();
    console.log("Connection established successfully");
  } catch (err) {
    if (++attempts > MAX_ATTEMPTS) {
      console.error("Cannot reach MongoDB, exiting...");
      return process.exit(1);
    }

    setTimeout(() => startServer(server), ATTEMPTS_DELAY);
    return console.error(
      "Failed to connect to MongoDB, retrying in 3 seconds",
      err
    );
  }

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`[Analytics] Server started at http://localhost:${PORT}`);
    onServerStarted && onServerStarted();
  });
};
