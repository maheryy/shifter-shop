import { Router } from "express";
import * as SearchController from "controllers/search.controller";

const router = Router();

router.get("/", SearchController.searchProducts);

export default router;
