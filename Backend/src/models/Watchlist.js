import mongoose from "mongoose";

const watchlistStockSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
    uppercase: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    stocks: [watchlistStockSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);