import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  updateInventory,
} from "../controllers/inventory.contraller.js";

const router = express.Router();

router.post("/createInventory", createInventory);
router.get("/getInventory", getInventory);
router.get("/getInventory/:id", getInventoryById); // Fixed route to call getInventoryById
router.put("/updateInventory/:id", updateInventory);
router.delete("/deleteInventory/:id", deleteInventory);

export default router;
