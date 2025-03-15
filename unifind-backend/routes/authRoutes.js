const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");


const JWT_SECRET = process.env.JWT_SECRET;


router.post(
  "/register",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      
      let user = await User.findOne({ email });
      if (user) {
        console.log("User already exists!");
        return res.status(400).json({ message: "User already exists" });
      }

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

    
      user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();
      console.log("User Registered Successfully:", user);

      
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET,  { expiresIn: "1h" });

      res.status(201).json({ success: true, token, message: "Registration successful!" });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
     
    }
  }
);


router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

    
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, token, message: "Login successful!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//Get Logged-in User (Protected Route)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
