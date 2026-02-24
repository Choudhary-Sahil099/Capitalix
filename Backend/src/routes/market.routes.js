import express from "express";
import {
  fetchIndices,
  fetchMovers,
  searchStocks,
  getStockChart,
  getStockQuote,
} from "../controllers/market.controller.js";

const router = express.Router();

router.get("/indices", fetchIndices);
router.get("/movers", fetchMovers);
router.get("/search", searchStocks);
router.get("/chart/:symbol", getStockChart);
router.get("/quote/:symbol", getStockQuote);

export default router;