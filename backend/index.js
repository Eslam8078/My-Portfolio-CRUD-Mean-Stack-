require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const { authenticate, requireAdmin } = require("./middleware/auth");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { UPLOAD_DIR } = require("./middleware/upload");

const app = express();
const port = Number(process.env.PORT || 3000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:4200";

const PUBLIC_ROUTES = [
    { path: "/auth/login", method: "POST" },
    { path: "/contact", method: "POST" },
    { path: "/home", method: "GET" },
    { path: "/about", method: "GET" },
    { path: "/education", method: "GET" },
    { path: "/experience", method: "GET" },
    { path: "/projects", method: "GET" },
    { path: "/skills", method: "GET" }
];

const isPublicRoute = (req) => {
    if (["HEAD", "OPTIONS"].includes(req.method)) return true;
    return PUBLIC_ROUTES.some(route => route.path === req.path && route.method === req.method);
};

app.disable("x-powered-by");

app.use(
    cors({
        origin: frontendOrigin,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "7d", index: false }));

app.use("/api", (req, res, next) => {
    if (isPublicRoute(req)) return next();

    authenticate(req, res, error => {
        if (error) return next(error);
        requireAdmin(req, res, next);
    });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/about", require("./routes/about"));
app.use("/api/home", require("./routes/home"));
app.use("/api/education", require("./routes/education"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        console.log("Database connected");
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        process.exit(1);
    }
};

start();
