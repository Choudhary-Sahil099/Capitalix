import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  getSimilarStocks
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, addToWatchlist); // route to add the stock

router.get("/", authMiddleware, getWatchlist);// to get the stocks in the watchlist
router.get("/similar/:symbol", getSimilarStocks); // fetch similar stocks

router.delete("/:asset", authMiddleware, removeFromWatchlist);// remove the stock from the watchlist

export default router;