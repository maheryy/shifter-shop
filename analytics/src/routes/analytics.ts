import Mongo, { db } from "database/Mongo";
import { Router } from "express";
import { UAParser } from "ua-parser-js";

const router = Router();

router.get("/test", async (req, res) => {
  const userAgent = UAParser(req.headers["user-agent"]);
  const data = await db.collection("test").find().toArray();
  req.sendEvent({ type: "test", data: { userAgent } });

  res.json([data, userAgent]);
});

router.post("/event", async (req, res) => {
  res.send("Hello from analytics");
});

export default router;
