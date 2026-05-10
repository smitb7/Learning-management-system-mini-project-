const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");


// to protect our routes we are implementing a protect befor user access 
const { protect } = require("../middleware/authMiddleware");



router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

module.exports = router;