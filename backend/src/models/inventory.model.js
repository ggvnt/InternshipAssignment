import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    initialStock: { type: Number, required: true },
    purchased: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    currentStock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;
