import mongoose from "mongoose";
import Usage from "../models/usageLog.model.js";
import Inventory from "../models/inventory.model.js";

export const createUsage = async (req, res) => {
  const { inventoryId, date, quantityUsed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
    return res.status(400).json({ message: "Invalid inventory ID" });
  }

  try {
    const inventoryItem = await Inventory.findById(inventoryId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    const usageQuantity = Number(quantityUsed);
    if (isNaN(usageQuantity) || usageQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity used" });
    }

    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (inventoryItem.currentStock < usageQuantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const newUsage = new Usage({
      inventoryId,
      date: new Date(date),
      quantityUsed: usageQuantity,
    });

    await newUsage.save();

    inventoryItem.used += usageQuantity;
    inventoryItem.currentStock -= usageQuantity;
    await inventoryItem.save();

    res
      .status(201)
      .json({ message: "Usage recorded successfully", usage: newUsage });
  } catch (error) {
    console.error("Error creating usage log:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUsageLogs = async (req, res) => {
  try {
    const usageLogs = await Usage.find().populate("inventoryId");

    if (!usageLogs || usageLogs.length === 0) {
      return res.status(200).json([]); // Return an empty array instead of error
    }

    res.status(200).json(usageLogs);
  } catch (error) {
    console.error("Error fetching usage logs:", error);
    res.status(500).json({ message: "Server error while fetching usage logs" });
  }
};
