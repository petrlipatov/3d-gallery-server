export const express = require("express");
const { processImage } = require("../controllers/processImageController");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

router.post("/upload", upload.single("file"), processImage);

module.exports = router;
