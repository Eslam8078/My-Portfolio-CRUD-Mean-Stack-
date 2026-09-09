const Home = require("../models/home");
const asyncHandler = require("../utils/asyncHandler");

const getHome = asyncHandler(async (req, res) => {
    const home = await Home.findOne({ isDeleted: false });
    res.json(home);
});

const updateHome = asyncHandler(async (req, res) => {
    const data = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        github: req.body.github,
        linkedin: req.body.linkedin
    };

    const files = req.files || {};

    if (files.image?.[0]) {
        data.imageUrl = `/uploads/${files.image[0].filename}`;
    }

    if (files.resume?.[0]) {
        data.resumeUrl = `/uploads/${files.resume[0].filename}`;
    }

    const home = await Home.findOneAndUpdate({ isDeleted: false }, data, {
        new: true,
        upsert: true,
        runValidators: true
    });

    res.json(home);
});

module.exports = { getHome, updateHome };
