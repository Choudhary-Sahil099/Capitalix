import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  marketPrice: {
    type: Number,
    default: 0,
  },
  invested: {
    type: Number,
    default: 0,
  },
  current: {
    type: Number,
    default: 0,
  },
  returns: {
    value: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
});

// this schema matches the frontend design rather than the simple design earlier 

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String, // used to store the type of the watchlist .ie wathlist1 , wahtchlist2
      required: true,
    },
    stocks: [stockSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);

