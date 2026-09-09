const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        technologies: { type: [String], default: [] },
        github: { type: String, default: "" },
        livedemo: { type: String, default: "" },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
