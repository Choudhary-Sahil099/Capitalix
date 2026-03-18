import Notification from "../models/Notification";
export const createNotification = async ({
  userId,
  type,
  title,
  message,
  data = {},
}) => {
  return await Notification.create({
    userId,
    type,
    title,
    message,
    data,
  });
};