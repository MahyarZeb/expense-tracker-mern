// api/index.js
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const transactionsRouter = require("./routes/transactions");
require("dotenv").config();
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/transactions", transactionsRouter);

module.exports = app;
module.exports.handler = serverless(app);
