import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addToWatchlist);

router.get("/", authMiddleware, getWatchlist);

router.delete("/:asset", authMiddleware, removeFromWatchlist);

export default router;