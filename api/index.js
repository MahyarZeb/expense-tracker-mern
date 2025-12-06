// api/index.js
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const transactions = require("./routes/transactions");
require("dotenv").config();
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/v1/transactions", transactions);

module.exports = app;
module.exports.handler = serverless(app); // Vercel uses this
