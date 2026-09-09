const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        period: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        highlights: { type: [String], default: [] },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
