import express from "express";
import IMAGES from "../data/data.json";

const router = express.Router();

router.get("/images", (req, res) => {
  res.json(IMAGES);
});

export default router;
