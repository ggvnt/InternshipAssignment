import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  getStockSummary,
  updateInventory,
} from "../controllers/inventory.contraller.js";

const router = express.Router();

router.post("/createInventory", createInventory);
router.get("/getInventory", getInventory);
router.get("/getInventory/:id", getInventoryById); // Fixed route to call getInventoryById
router.put("/updateInventory/:id", updateInventory);
router.delete("/deleteInventory/:id", deleteInventory);

router.get("/stockSummary", getStockSummary);

export default router;
