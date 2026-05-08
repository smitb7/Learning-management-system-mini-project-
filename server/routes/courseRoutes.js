const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


// admin create
router.post("/", protect, adminOnly, createCourse);

// public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// update course
router.put("/:id", protect, adminOnly, updateCourse);

// delete course
router.delete("/:id", protect, adminOnly, deleteCourse);

module.exports = router;