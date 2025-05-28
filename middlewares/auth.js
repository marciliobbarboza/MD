const jwt = require("jsonwebtoken");

// Ideally load secretKey from environment variables
const secretKey = "TUQ6c2VjcmV0a2V5";  // This looks base64-encoded, make sure it's valid

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.warn("Authorization header missing or malformed.");
            return res.status(401).json({ error: "Access denied! Token not provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);

        req.userId = decoded.userId; // Or however your payload is structured

        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ error: "Invalid token!" });
    }
};

module.exports = protect;