// controllers/lectureController.js

const Course = require("../model/course");
const Lecture = require("../model/lecture");

exports.addLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { instructorName, date } = req.body;

    var currDate = date;

    // Check if the instructor is already scheduled for a lecture on the specified date
    const instructor = await Lecture.find({
      instructorName,
    });

    const allDates = instructor.flatMap(
      (instructorData) => instructorData.date
    ); //create a array of dates
    allDates.forEach((date) => {
      console.log("currDate", currDate);
      if (date === currDate) {
        return res.status(400).json({
          message:
            "Instructor is already scheduled for a lecture on this date.",
        });
      }
    });

    const lecture = new Lecture({
      course: courseId,
      instructorName,
      date,
    });

    await lecture.save();

    res
      .status(201)
      .json({ message: "Lecture slot created successfully", lecture });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create lecture slot", error: err.message });
  }
};

exports.deleteLecture = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the course by ID and delete it
    await Lecture.findByIdAndDelete(id);
    res.status(204).send(); // No content to send after successful deletion
  } catch (err) {
    console.error("Error deleting lecture:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
