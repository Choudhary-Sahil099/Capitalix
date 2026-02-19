import express from "express";
import { getPositions } from "../controllers/position.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPositions);

export default router;
