import express from "express";
import { getStockChart } from "../controllers/stockController.js";

const router = express.Router();

router.get("/chart/:symbol", getStockChart);

export default router;