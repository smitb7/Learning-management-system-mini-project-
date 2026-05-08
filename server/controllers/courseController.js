const Course = require("../models/CourseModel")



// create the course 

const createCourse = async (req,res)=>{

    try {
        
        const {title, description, price, thumbnail, videoPreview} = req.body

        const course = await Course.create({
            title,
            description, 
            price, 
            thumbnail, 
            videoPreview,
            createdBy: req.user._id, // through middleware
        })

        res.status(201).json({
            message : "Course created successfully",
            course
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


// Get all Course 
const getCourses = async (req,res)=>{

    try {

    const courses = await Course.find().populate("createdBy", "name email");

    res.json(courses);



    } catch (error) {

        res.status(500).json({
            error : error.message
        })
        
    }

}


// get single course 
const getCourseById = async (req,res)=>{

    try {

        const course  = await Course.findById(req.params.id);

        if(!course){
            res.status(404).json({
                message : "Course not Found..!"
            })
        }

        res.json(course)


    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }    

}

// update course 
const updateCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // update fields
      course.title = req.body.title || course.title;
      course.description = req.body.description || course.description;
      course.price = req.body.price || course.price;
      course.thumbnail = req.body.thumbnail || course.thumbnail;
      course.videoPreview = req.body.videoPreview || course.videoPreview;
  
      const updatedCourse = await course.save();
  
      res.json({
        message: "Course updated successfully",
        updatedCourse,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // delete course 
  
  const deleteCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      await course.deleteOne();
  
      res.json({
        message: "Course deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  
module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}