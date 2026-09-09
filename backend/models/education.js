const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
    {
        degree: { type: String, required: true, trim: true },
        university: { type: String, required: true, trim: true },
        period: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
