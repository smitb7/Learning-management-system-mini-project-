const Enrollment = require("../models/EnrollmentModel")
const Course = require("../models/CourseModel")

// course enrollment 

const enrollCourse = async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      // check course exists or not 
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // check if user already enrolled
      const alreadyEnrolled = await Enrollment.findOne({
        user: req.user._id,
        course: courseId,
      });
  
      if (alreadyEnrolled) {
        return res.status(400).json({ message: "Already enrolled" });
      }
  
      const enrollment = await Enrollment.create({
        user: req.user._id,
        course: courseId,
      });
  
      res.status(201).json({
        message: "Enrolled successfully",
        enrollment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // get courses


  const getMyCourses = async (req, res) => {
    try {
      const enrollments = await Enrollment.find({ user: req.user._id })
        .populate("course");
  
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Update Progress 
  const updateProgress = async (req, res) => {
    try {
      const { progress } = req.body;
  
      const enrollment = await Enrollment.findById(req.params.id);
  
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
  
      // security check
      if (enrollment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not allowed" });
      }
  
      enrollment.progress = progress;
  
      if (progress === 100) {
        enrollment.status = "completed";
      }
  
      await enrollment.save();
  
      res.json({
        message: "Progress updated",
        enrollment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports = {
    enrollCourse,
    getMyCourses,
    updateProgress,
  };