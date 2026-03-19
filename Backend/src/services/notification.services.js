import Notification from "../models/Notification.js";

export const createNotification = async ({
  userId,
  type,
  title,
  message,
  data = {},
}) => {
  // prevent duplicate notifications
  const exists = await Notification.findOne({
    userId,
    message,
  });

  if (exists) return;

  return await Notification.create({
    userId,
    type,
    title,
    message,
    data,
  });
};