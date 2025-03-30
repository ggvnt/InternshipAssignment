import express from "express";
import {
  createPurchase,
  getPurchases,
} from "../controllers/purchaseControllers.js";
import { createUsage, getUsageLogs } from "../controllers/usageController.js";

const router = express.Router();

// Purchase Routes
router.post("/createPurchase", createPurchase); // Create a new purchase
router.get("/getPurchaseLogs", getPurchases); // Get all purchases

// Usage Log Routes
router.post("/createUsage", createUsage); // Create a new usage log
router.get("/getUsageLogs", getUsageLogs); // Get all usage logs

export default router;
