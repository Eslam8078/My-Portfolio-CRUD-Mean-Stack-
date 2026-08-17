const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const projectSchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    technologies:
    {
        type: [String],
        default: []
    },
    github:
    {
        type: String,
        default: ""

    },
    livedemo:
    {
        type: String,
        default: ""
    }
},
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

router.get("/", async (req, res) => {
    try {

        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.post("/", async (req, res) => {
    try {
        const projects = await Project.create(req.body);
        res.status(201).json(projects)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const projects = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json(projects)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const projects = await Project.findByIdAndDelete(req.params.id)
        res.status(200).json(projects)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})




module.exports = router;