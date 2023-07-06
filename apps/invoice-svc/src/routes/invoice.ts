import { Router } from "express";
import * as InvoiceController from "controllers/invoice.controller";

const router = Router();

router.get("/:reference", InvoiceController.generateInvoice);

export default router;
