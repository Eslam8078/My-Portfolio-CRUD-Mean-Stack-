const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Skills = mongoose.model("Skills", skillsSchema);

router.get("/", async (req, res) => {
    try {
        const skills = await Skills.find().sort({ category: 1, name: 1 });
        res.status(200).json(skills)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const skill = await Skills.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        res.status(200).json(skill);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const skills = await Skills.create(req.body)
        res.status(201).json(skills)

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

router.put("/:id", async (req, res) => {
    try {
        const skills = await Skills.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json(skills)

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const skills = await Skills.findByIdAndDelete(req.params.id)
        res.status(200).json(skills)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = router;