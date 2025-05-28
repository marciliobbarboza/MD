const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middlewares/auth");
const Movie = require("../models/moviesTR");

const router = express.Router();

// route to register a user
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

// route to list all users
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error when searching for users" });
  }
});


// login route
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

      const token = jwt.sign({ userId: user._id }, "TUQ6c2VjcmV0a2V5", { expiresIn: "1h" });

      res.json({ token, username: user.name });
    } catch (error) {
      res.status(500).json({ error: "Error when logging in" });
    }
  }
);

// Route to fetch user reviews
router.get("/reviews", protect, async (req, res) => {
  try {
      const userId = req.userId; // get the ID of the user logged in by the middleware

      const movies = await Movie.find({ "reviews.userId": userId });

      if (movies.length === 0) {
          return res.json([]); // returns empty if there are no reviews
      }
      
      const userReviews = movies.map((movie) => {
          const userReview = movie.reviews.find((review) => review.userId.toString() === userId);
          return {
              movieId: movie._id,
              title: movie.title,
              poster: movie.poster,
              rating: userReview.rating,
              type: movie.type,
          };
      });

      res.json(userReviews);
  } catch (error) {
      console.error("Error fetching user reviews:", error);
      res.status(500).json({ error: "Error fetching reviews." });
  }
});


module.exports = router;
