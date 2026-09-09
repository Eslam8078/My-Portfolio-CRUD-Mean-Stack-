const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
        title: { type: String, required: true, trim: true, maxlength: 160 },
        description: { type: String, required: true, trim: true, maxlength: 2000 },
        email: { type: String, default: "", trim: true, lowercase: true },
        phone: { type: String, default: "", trim: true },
        location: { type: String, default: "", trim: true },
        imageUrl: { type: String, default: "" },
        resumeUrl: { type: String, default: "" },
        github: { type: String, default: "", trim: true },
        linkedin: { type: String, default: "", trim: true },
        isDeleted: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Home", homeSchema);
