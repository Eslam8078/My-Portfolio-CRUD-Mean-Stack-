const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");

const router = express.Router();

const homeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "",
        },
        resumeUrl: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        linkedin: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Home = mongoose.model("Home", homeSchema);

const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/", filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
});

router.get("/", async (req, res) => {
    try {
        const home = await Home.findOne();
        res.json(home);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                title: req.body.title,
                description: req.body.description,
                github: req.body.github,
                linkedin: req.body.linkedin,
            };

            if (req.files.image) {
                data.imageUrl = `/uploads/${req.files.image[0].filename}`;
            }

            if (req.files.resume) {
                data.resumeUrl = `/uploads/${req.files.resume[0].filename}`;
            }

            const home = await Home.findOneAndUpdate({}, data, {
                new: true,
                upsert: true,
                runValidators: true,
            });

            res.json(home);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;