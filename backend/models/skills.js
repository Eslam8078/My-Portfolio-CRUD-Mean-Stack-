const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        level: { type: Number, required: true, min: 0, max: 100 },
        category: { type: String, required: true, trim: true },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Skills", skillsSchema);
