export const checkPriceAlerts = async () => {
  const alerts = await PriceAlert.find({ triggered: false })
  for (const alert of alerts) {
    const price = await getStockPrice(alert.symbol);
    // SOMTHING LIKE THE STOP LOSS FEATURE BUT A NOTIFICATION--> future refrence
    if (price >= alert.targetPrice) {
      await createNotification({
        userId: alert.userId,
        type: "price",
        title: "Price Alert",
        message: `${alert.symbol} reached ₹${alert.targetPrice}`,
      });

      alert.triggered = true;
      await alert.save();
    }
  }
};