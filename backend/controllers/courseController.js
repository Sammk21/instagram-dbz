// controllers/courseController.js

const Course = require("../model/course");

exports.createCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { name, level, description } = req.body;
    const avatar = req.file.path;
    const course = new Course({ name, level, description, avatar });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the course by ID and delete it
    await Course.findByIdAndDelete(id);
    res.status(204).send(); // No content to send after successful deletion
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, level, description } = req.body;

    // Check if the course exists
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update the course fields
    existingCourse.name = name;
    existingCourse.level = level;
    existingCourse.description = description;

    // If there's a file upload for avatar, update it as well
    if (req.file) {
      existingCourse.avatar = req.file.path;
    }

    // Save the updated course
    await existingCourse.save();

    res.status(200).json(existingCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    // Handle errors
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
