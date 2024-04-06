const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  instructorName: String,
  date: String,
});
const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
