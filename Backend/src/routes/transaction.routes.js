import express from "express";
import {
  addTransaction,
  getTransactions,
} from "../controllers/transaction.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);

export default router;
