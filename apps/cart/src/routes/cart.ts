import { Router } from "express";
import * as CartController from "controllers/cart.controller";

const router = Router();

router.get("/", CartController.getCart);
router.post("/", CartController.updateCartItem);

export default router;
