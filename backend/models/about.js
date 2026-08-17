const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");

const router = express.Router();


const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const About = mongoose.model("About", aboutSchema);


const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/", filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
});



router.get("/", async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/", upload.single("image"), async (req, res) => {
    try {

        const data = {
            title: req.body.title,
            description: req.body.description
        };

        if (req.file) {
            data.imageUrl = `/uploads/${req.file.filename}`;
        }

        const about = await About.findOneAndUpdate({}, data, {
            new: true,
            upsert: true,
            runValidators: true
        }
        );

        res.json(about);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;