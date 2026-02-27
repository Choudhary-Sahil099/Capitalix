import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // add the orderID for the user to validate proper fetching of the stock
    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    asset: {
      type: String,
      required: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Pending", "Cancelled"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);