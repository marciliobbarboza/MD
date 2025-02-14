const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied!" });
  }

  try {
    const decoded = jwt.verify(token, "secrectKey");
    req.userId = decoded.userId;  // Add the userId to the req
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token!" });
  }
};

module.exports = protect;
