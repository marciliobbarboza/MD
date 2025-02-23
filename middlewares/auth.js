const jwt = require("jsonwebtoken");

const secretKey = "secretKey"; // A mesma usada no login!

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access denied! Token not provided." });
        }

        const token = authHeader.split(" ")[1]; // Remove "Bearer "
        const decoded = jwt.verify(token, secretKey); // Verifica o token

        req.userId = decoded.userId; // Adiciona o usuário à requisição
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token!" });
    }
};

module.exports = protect;