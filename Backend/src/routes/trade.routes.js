import express from "express";
import { buyStock, sellStock } from "../controllers/trade.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/buy", protect, buyStock);
router.post("/sell", protect, sellStock);

export default router;