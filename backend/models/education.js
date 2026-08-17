const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const educationSchema = new mongoose.Schema({

    degree: {
        type: String,
        required: true
    },
    university: {
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
    description: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
)

const Education = mongoose.model("Education", educationSchema);

router.get("/", async (req, res) => {
    try {

        const educations = await Education.find().sort({ createdAt: -1 });
        res.status(200).json(educations);
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {

        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        res.status(200).json(education);
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.post("/", async (req, res) => {
    try {

        const education = await Education.create(req.body);
        res.status(201).json(education);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.put("/:id", async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(education);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {

        const education = await Education.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Education deleted" });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});


module.exports = router;