import express from "express";
import { fetchIndices, fetchMovers, searchStocks } 
  from "../controllers/market.controller.js";

const router = express.Router();

router.get("/indices", fetchIndices);
router.get("/movers", fetchMovers);
router.get("/search", searchStocks);

export default router;
