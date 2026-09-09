const crypto = require("crypto");
const User = require("../models/user");

const getSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must be configured and contain at least 32 characters");
    }
    return secret;
};

const createToken = (user) => {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const payload = Buffer.from(JSON.stringify({
        sub: user._id.toString(),
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_EXPIRES_IN || 86400)
    })).toString("base64url");
    const signature = crypto.createHmac("sha256", getSecret()).update(`${header}.${payload}`).digest("base64url");
    return `${header}.${payload}.${signature}`;
};

const verifyToken = (token) => {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid token");
    const [header, payload, signature] = parts;
    const expected = crypto.createHmac("sha256", getSecret()).update(`${header}.${payload}`).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error("Invalid token");
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
    return data;
};

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || "";
        if (!authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const payload = verifyToken(authorization.slice(7));
        const user = await User.findById(payload.sub).select("+passwordHash");

        if (!user || !user.isActive) {
            return res.status(401).json({ message: "User is not authorized" });
        }

        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired authentication token" });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

module.exports = { authenticate, requireAdmin, createToken, verifyToken };
