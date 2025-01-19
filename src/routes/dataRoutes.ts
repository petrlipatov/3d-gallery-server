export const express = require("express");
const { IMAGES } = require("../../public/data");

const router = express.Router();

router.get("/images", (req, res) => {
  res.json(IMAGES);
});

module.exports = router;
