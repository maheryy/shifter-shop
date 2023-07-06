import { Router } from "express";
import * as PaymentController from "controllers/payment.controller";

const router = Router();

router.post("/checkout", PaymentController.checkoutSession);
router.post("/webhook", PaymentController.webhook);

export default router;
