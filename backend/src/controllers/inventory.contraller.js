import Inventory from "../models/inventory.model.js";
import mongoose from "mongoose";

export const createInventory = async (req, res) => {
  const { name, category, initialStock } = req.body;

  if (
    !name ||
    !category ||
    typeof initialStock !== "number" ||
    initialStock <= 0
  ) {
    return res
      .status(400)
      .json({ message: "Invalid data. Ensure all fields are correct." });
  }

  try {
    const newInventory = new Inventory({
      name,
      category,
      initialStock,
      currentStock: initialStock,
    });

    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { purchased, used } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No inventory with that id");
  }

  try {
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    inventory.purchased += purchased;
    inventory.used += used;
    inventory.currentStock =
      inventory.initialStock + inventory.purchased - inventory.used;

    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No inventory with that id");
  }

  try {
    await Inventory.findByIdAndDelete(id); // Updated method
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getInventoryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No inventory with that id");
  }

  try {
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
