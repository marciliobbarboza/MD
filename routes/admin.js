const express = require("express");
const User = require("../models/User"); // Importing the User model
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/check-admin", protect, async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Find the user by the ID present in the token
        if (user && user.isAdmin) {
            return res.status(200).json({ isAdmin: true }); // Returns true only if it is admin
        } else {
            return res.status(403).json({ isAdmin: false }); // Returns false for normal users
        }
    } catch (error) {
        console.error("Error checking if user is admin:", error);
        return res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
