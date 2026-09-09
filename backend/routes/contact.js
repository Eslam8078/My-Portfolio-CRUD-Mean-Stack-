const express = require("express");
const controller = require("../controllers/contact.controller");

const router = express.Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/:id", controller.remove);
router.patch("/:id/read", controller.markAsRead);

module.exports = router;
