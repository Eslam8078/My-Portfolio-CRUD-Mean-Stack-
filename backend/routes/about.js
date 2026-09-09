const express = require("express");
const { getAbout, updateAbout } = require("../controllers/about.controller");
const { imageUpload } = require("../middleware/upload");

const router = express.Router();

router.get("/", getAbout);
router.put("/", imageUpload.single("image"), updateAbout);

module.exports = router;
