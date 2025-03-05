const express = require("express");
const User = require("../models/User"); // Importando o modelo User
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/check-admin", protect, async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Encontrar o usuário pelo ID presente no token
        if (user && user.isAdmin) {
            return res.status(200).json({ isAdmin: true }); // Retorna true apenas se for admin
        } else {
            return res.status(403).json({ isAdmin: false }); // Retorna false para usuários normais
        }
    } catch (error) {
        console.error("Erro ao verificar se o usuário é admin:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
});

module.exports = router;
