export const express = require("express");
import { IMAGES } from "../../public/data";

const router = express.Router();

router.get("/images", (req, res) => {
  res.json(IMAGES);
});

module.exports = router;
