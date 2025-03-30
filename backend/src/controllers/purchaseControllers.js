import mongoose from "mongoose";
import Purchase from "../models/purchase.model.js";
import Inventory from "../models/inventory.model.js";

// Create a new purchase entry and update inventory stock
export const createPurchase = async (req, res) => {
  const { inventoryId, date, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
    return res.status(404).send("Invalid inventory ID");
  }

  try {
    // Check if the inventory item exists
    const inventoryItem = await Inventory.findById(inventoryId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Create new purchase
    const newPurchase = new Purchase({
      inventoryId,
      date,
      quantity,
    });

    // Save purchase log
    await newPurchase.save();

    // Update inventory's purchased and current stock
    inventoryItem.purchased += quantity;
    inventoryItem.currentStock += quantity;
    await inventoryItem.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("inventoryId");

    if (purchases.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: error.message });
  }
};
