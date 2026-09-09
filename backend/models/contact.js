const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        subject: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        unread: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
