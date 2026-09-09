const express = require("express");
const User = require("../models/user");
const { authenticate, requireAdmin, createToken } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user || !user.isActive || !user.verifyPassword(password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            token: createToken(user),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

router.get("/me", authenticate, requireAdmin, (req, res) => {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role });
});

module.exports = router;
