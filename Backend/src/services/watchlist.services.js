import { createNotification } from "./notification.services.js";
export const checkWatchlistAlerts = async (userId, stocks, watchlist) => {
  let updated = false;

  for (const item of stocks) {
    const dbStock = watchlist.stocks.find(
      (s) => s.asset === item.asset
    );

    if (!dbStock) continue;

    try {
      if (item.dayPercent <= -1 && !dbStock.alertSentLow) {
        await createNotification({
          userId,
          type: "watchlist",
          title: "Watchlist Alert",
          message: `${item.asset} dropped ${item.dayPercent.toFixed(2)}%`,
        });

        dbStock.alertSentLow = true;
        dbStock.alertSentHigh = false;
        updated = true;
      }
      else if (item.dayPercent >= 1 && !dbStock.alertSentHigh) {
        await createNotification({
          userId,
          type: "watchlist",
          title: "Watchlist Alert",
          message: `${item.asset} surged ${item.dayPercent.toFixed(2)}%`,
        });

        dbStock.alertSentHigh = true;
        dbStock.alertSentLow = false;
        updated = true;
      }
      else if (item.dayPercent > -1 && item.dayPercent < 1) {
        if (dbStock.alertSentHigh || dbStock.alertSentLow) {
          dbStock.alertSentHigh = false;
          dbStock.alertSentLow = false;
          updated = true;
        }
      }
    } catch (err) {
      console.error("Notification error:", err.message);
    }
  }

  if (updated) {
    await watchlist.save();
  }
};