const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Route to register a user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is mandatory."),
    body("email").isEmail().withMessage("Invalid email."),
    body("password").isLength({ min: 6 }).withMessage("Password must have at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user." });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email."),
    body("password").notEmpty().withMessage("Password is mandatory."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, "secrectKey", { expiresIn: "1h" });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error when logging in" });
    }
  }
);

module.exports = router;
