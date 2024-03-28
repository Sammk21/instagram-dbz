// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors"); 
const path = require("path");
const http = require("http");


const app = express();
const PORT = process.env.PORT || 9000;



// MongoDB connection
mongoose.connect( process.env.MONGO_URL || "mongodb://localhost:27017/instagram", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Middleware
app.use(cors({
 origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ["GET", "POST"],
})); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/posts", require("./routes/posts"));





// Start server
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
const io = socket(server,{
   cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);






