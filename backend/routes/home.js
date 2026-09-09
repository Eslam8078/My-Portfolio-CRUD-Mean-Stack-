const express = require("express");
const { getHome, updateHome } = require("../controllers/home.controller");
const { profileUpload } = require("../middleware/upload");

const router = express.Router();

router.get("/", getHome);
router.put(
    "/",
    profileUpload.fields([
        { name: "image", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    updateHome
);

module.exports = router;
