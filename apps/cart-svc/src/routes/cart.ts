import { Router } from "express";
import * as CartController from "controllers/cart.controller";

const router = Router();

router.get("/", CartController.getCart);
router.post("/", CartController.updateCartItem);
router.post("/sync", CartController.syncCart);

export default router;
