import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getPortfolioSummary } from "../controllers/portfolio.controller.js";

const router = express.Router();

router.get("/summary", authMiddleware, getPortfolioSummary);

export default router;
