const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")


//  protected routes (must Login)

const protect = async (req, res, next) => {
    let token;
  
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        // collect token from header
        token = req.headers.authorization.split(" ")[1];
  
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // attach user to request (without password)
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } else {
        return res.status(401).json({ message: "Not authorized, no token" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Token failed" });
    }
  };
  
  
  