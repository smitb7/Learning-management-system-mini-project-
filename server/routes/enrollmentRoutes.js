const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyCourses,
  updateProgress,
} = require("../controllers/enrollmentController");

const { protect } = require("../middleware/authMiddleware");


// enroll
router.post("/:courseId", protect, enrollCourse);

// my courses
router.get("/my", protect, getMyCourses);

// update progress
router.put("/:id/progress", protect, updateProgress);

module.exports = router;