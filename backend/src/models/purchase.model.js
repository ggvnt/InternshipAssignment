import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);
export default Purchase;
