const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const { middleware } = require("../middleware/jwtmiddleware");

router.get("/", middleware, videoController.getVideos);

module.exports = router;
