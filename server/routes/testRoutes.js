
//just for testing (authMiddleware )
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

// normal protected route
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User route accessed",
    user: req.user,
  });
});

// admin only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Admin route accessed",
  });
});

module.exports = router;
