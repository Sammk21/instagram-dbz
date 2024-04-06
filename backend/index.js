// src/app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const courseRoutes = require("./routes/course");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 9000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use the cors middleware with options
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/courseDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/courses", courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
