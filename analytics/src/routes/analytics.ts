import Mongo, { db } from "database/Mongo";
import { Router } from "express";
import { UAParser } from "ua-parser-js";

const router = Router();

router.get("/", async (req, res) => {
  const userAgent = UAParser(req.headers["user-agent"]);
  const data = await db.collection("test").find().toArray();

  res.json([data, userAgent]);
});

router.post("/", async (req, res) => {
  res.send("Hello from analytics");
});

export default router;
