import express from "express";
import { fetchIndices, fetchMovers } from "../controllers/market.controller.js";

const router = express.Router();

router.get("/indices", fetchIndices);
router.get("/movers", fetchMovers);

export default router;
