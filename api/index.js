// api/index.js
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const transactionsRouter = require("./routes/transactions");
require("dotenv").config(); // good for local, but Vercel uses env vars from dashboard
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // use the serverless-safe version

app.use("/api/v1/transactions", transactionsRouter);

// export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
