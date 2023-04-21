import Mongo from "database/Mongo";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const db = await Mongo.getDatabase();
  res.send("Hello from analytics");
});

router.post("/analytics", async (req, res) => {
  res.send("Hello from analytics");
});

export default router;
