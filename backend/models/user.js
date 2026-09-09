const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.methods.setPassword = function(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    this.passwordHash = `${salt}:${hash}`;
};

userSchema.methods.verifyPassword = function(password) {
    if (!this.passwordHash) return false;
    const [salt, storedHash] = this.passwordHash.split(":");
    if (!salt || !storedHash) return false;
    const derivedHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(derivedHash, "hex"));
};

module.exports = mongoose.model("User", userSchema);
