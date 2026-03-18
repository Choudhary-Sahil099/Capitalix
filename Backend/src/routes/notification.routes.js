import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// CREATE notification
router.post("/", async (req, res) => {
  try {
    const { type, title, message } = req.body;

    const notification = await Notification.create({
      userId: req.user?.id || "testUser",
      type,
      title,
      message,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Failed to create notification" });
  }
});
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

export default router;