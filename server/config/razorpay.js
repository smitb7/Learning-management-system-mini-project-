const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.rzp_test_SnpUyX1oPwhGNP,
  key_secret: process.env.XQ8uXaCAwRmDZlx9HwQQAkdi,
});

module.exports = razorpayInstance;