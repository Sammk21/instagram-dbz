// models/Course.js

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  avatar: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
