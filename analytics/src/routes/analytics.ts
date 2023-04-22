import Mongo from "database/Mongo";
import { Router } from "express";
import { UAParser } from "ua-parser-js";

const router = Router();

router.get("/", async (req, res) => {
  // const db = await Mongo.getDatabase();
  const data = UAParser(req.headers["user-agent"]);
  console.log(data, req.ip);
  res.send("Hello from analytics");
});

router.post("/analytics", async (req, res) => {
  res.send("Hello from analytics");
});

export default router;
