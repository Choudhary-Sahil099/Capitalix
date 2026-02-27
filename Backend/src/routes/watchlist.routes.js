import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, addToWatchlist); // route to add the stock

router.get("/", authMiddleware, getWatchlist);// to get the stocks in the watchlist

router.delete("/:asset", authMiddleware, removeFromWatchlist);// remove the stock from the watchlist

export default router;