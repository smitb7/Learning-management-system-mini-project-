const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Course = require("../models/EnrollmentModel");
const Enrollment = require("../models/EnrollmentModel");

// payment order generate
const createOrder = async (req, res) => {
  try {
    // catch the coutseId's value from the body
    const { courseId } = req.body;

    // find the course  by ID
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: "Course not Found",
      });
    }

    const options = {
      amount: course.price * 100, // paise
      currency: "INR",
      receipt: `receipt_${courseId}`,
    };


    const order = await razorpay.orders.create(options);

    res.json({
        order,
        course
    })

  } catch (error) {

    res.status(500).json({

        error : error.message
    })
  }
};



//  varification of the payment 
const verifyPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courseId,
      } = req.body;
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid payment" });
      }
  
      // enroll after successful payment
      const enrollment = await Enrollment.create({
        user: req.user._id,
        course: courseId,
      });
  
      res.json({
        message: "Payment successful & enrolled",
        enrollment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    createOrder,
    verifyPayment,
  };

  