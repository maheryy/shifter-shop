import { Router } from "express";
import * as OrderController from "controllers/order.controller";

const router = Router();

router.get("/", OrderController.getAllOrders);
router.post("/", OrderController.newOrder); // POST for testing purposes only
router.get("/:id", OrderController.getOrder);
router.patch("/:id", OrderController.updateOrder);
router.get("/customer/:id", OrderController.getCustomerOrders);

export default router;
