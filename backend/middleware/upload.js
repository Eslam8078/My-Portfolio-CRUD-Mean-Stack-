const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const DOCUMENT_TYPES = new Set([...IMAGE_TYPES, "application/pdf"]);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilterFor = (allowedTypes) => (req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
        return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
};

const imageUpload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilterFor(IMAGE_TYPES)
});

const profileUpload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const allowedTypes = file.fieldname === "resume" ? new Set(["application/pdf"]) : IMAGE_TYPES;
        return fileFilterFor(allowedTypes)(req, file, cb);
    }
});

module.exports = { imageUpload, profileUpload, UPLOAD_DIR };
