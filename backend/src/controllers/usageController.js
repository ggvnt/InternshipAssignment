import mongoose from "mongoose";
import Usage from "../models/usageLog.model.js";
import Inventory from "../models/inventory.model.js";

// Create a new usage entry and update inventory stock
export const createUsage = async (req, res) => {
  const { inventoryId, date, quantityUsed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
    return res.status(404).send("Invalid inventory ID");
  }

  try {
    // Check if the inventory item exists
    const inventoryItem = await Inventory.findById(inventoryId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Create new usage log
    const newUsage = new Usage({
      inventoryId,
      date,
      quantityUsed,
    });

    // Save usage log
    await newUsage.save();

    // Update inventory's used and current stock
    inventoryItem.used += quantityUsed;
    inventoryItem.currentStock -= quantityUsed;
    await inventoryItem.save();

    res.status(201).json(newUsage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all usage logs
export const getUsageLogs = async (req, res) => {
  try {
    const usageLogs = await Usage.find().populate("inventoryId");
    res.status(200).json(usageLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
