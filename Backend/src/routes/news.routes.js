import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getStockNews } from "../controllers/news.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getStockNews);

export default router;
