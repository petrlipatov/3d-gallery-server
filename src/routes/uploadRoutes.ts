import express from "express";
import { processImage } from "../controllers/processImageController";
import { upload } from "../middlewares/multerConfig";

const router = express.Router();

router.post("/upload", upload.single("file"), processImage);

export default router;
