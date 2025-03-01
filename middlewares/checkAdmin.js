const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Access denied! Admins only." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying admin role." });
  }
};

module.exports = checkAdmin;