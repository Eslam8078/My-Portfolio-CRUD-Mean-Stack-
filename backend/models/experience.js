const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const experienceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    period: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    highlights: {
        type: [String],
        default: []
    }
},
{timestamps: true}
);

const Experience = mongoose.model("Experience", experienceSchema);

router.get("/", async (req, res) => {
    try {

        const experience = await Experience.find().sort({ createdAt: -1 });
        res.status(200).json(experience)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(200).json(experience);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.post("/", async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json(experience)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id)
        res.status(200).json(experience)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = router;