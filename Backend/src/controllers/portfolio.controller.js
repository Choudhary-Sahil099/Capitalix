import Transaction from "../models/Transaction.js";

export const getPortfolioSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    if (!transactions.length) {
      return res.status(200).json({
        totalInvested: 0,
        totalSellValue: 0,
        netInvested: 0,
        assets: [],
      });
    }

    let totalInvested = 0;
    let totalSellValue = 0;

    const assetMap = {};

    transactions.forEach((tx) => {
      const { asset, type, quantity, price } = tx;

      if (!assetMap[asset]) {
        assetMap[asset] = {
          asset,
          buyQuantity: 0,
          sellQuantity: 0,
          invested: 0,
          sellValue: 0,
        };
      }

      if (type === "buy") {
        assetMap[asset].buyQuantity += quantity;
        assetMap[asset].invested += quantity * price;
        totalInvested += quantity * price;
      } else if (type === "sell") {
        assetMap[asset].sellQuantity += quantity;
        assetMap[asset].sellValue += quantity * price;
        totalSellValue += quantity * price;
      }
    });

    const assets = Object.values(assetMap).map((asset) => ({
      ...asset,
      netQuantity: asset.buyQuantity - asset.sellQuantity,
    }));

    const netInvested = totalInvested - totalSellValue;

    res.status(200).json({
      totalInvested,
      totalSellValue,
      netInvested,
      assets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 