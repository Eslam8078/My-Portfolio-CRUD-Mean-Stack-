const multer = require("multer");

const notFound = (req, res) => {
    res.status(404).json({ message: "Route not found" });
};

const errorHandler = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: error.message });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }

    if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid identifier" });
    }

    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
};

module.exports = { notFound, errorHandler };
