import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    asset: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);
