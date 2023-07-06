import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.status(200).send("Shifter Shop API is up and running")
);

export default router;
