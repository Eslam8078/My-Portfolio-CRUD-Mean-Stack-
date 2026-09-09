const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        imageUrl: { type: String, default: "" },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
