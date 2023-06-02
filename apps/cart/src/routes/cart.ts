import { Router } from "express";
import * as CartController from "controllers/cart.controller";

const router = Router();

router.get("/", CartController.getCart);
router.patch("/:productId", CartController.updateCartItem);

export default router;
