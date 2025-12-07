import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/v1/transactions", transactionRoutes);

// Export for Vercel
export default app;

// If running locally
if (process.env.VERCEL !== "1") {
  app.listen(5000, () =>
    console.log("Server running locally on http://localhost:5000")
  );
}
