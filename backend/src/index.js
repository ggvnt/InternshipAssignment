import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import inventoryRoutes from "./routes/inventory.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1009;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/inventory", inventoryRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT: ${PORT}`);
});
