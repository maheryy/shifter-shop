import { Router } from "express";
import * as InventoryController from "controllers/inventory.controller";

const router = Router();

router.get("/:productId", InventoryController.getRemainingQuantity);
router.post("/", InventoryController.newItem);
router.patch("/:productId", InventoryController.pullItem);
router.patch("/restock/:productId", InventoryController.restock);

export default router;
