import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    date: { type: Date, required: true },
    quantityUsed: { type: Number, required: true },
  },
  { timestamps: true }
);

const Usage = mongoose.model("Usage", UsageSchema);
export default Usage;
