const About = require("../models/about");
const asyncHandler = require("../utils/asyncHandler");

const getAbout = asyncHandler(async (req, res) => {
    const about = await About.findOne({ isDeleted: false });
    res.json(about);
});

const updateAbout = asyncHandler(async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description
    };

    if (req.file) {
        data.imageUrl = `/uploads/${req.file.filename}`;
    }

    const about = await About.findOneAndUpdate({ isDeleted: false }, data, {
        new: true,
        upsert: true,
        runValidators: true
    });

    res.json(about);
});

module.exports = { getAbout, updateAbout };
