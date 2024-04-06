// routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const lectureController = require("../controllers/lectureontroller");
const Course = require("../model/course");

const multer = require("multer");
const Lecture = require("../model/lecture");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Use the original file name for the uploaded file
    cb(null, file.originalname);
  },
});

// Set up multer upload
const upload = multer({ storage: storage });

// Get all Course
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", courseController.getCourse);

router.delete("/:id", courseController.deleteCourse);

router.post("/", upload.single("avatar"), courseController.createCourse);

router.post("/:courseId/lectures", lectureController.addLecture);

router.put("/:id", courseController.editCourse);

router.get("/in/lectures", async (req, res) => {
  try {
    const lectures = await Lecture.find().populate("course");
    res.json(lectures);
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/lectures/:id", lectureController.deleteLecture);

module.exports = router;
