import express from "express";
import path from "path";
import { processImage } from "../controllers/processImageController";
import { upload } from "../middlewares/multerConfig";
import { readImagesDataAsString } from "../services/imagesData";

const router = express.Router();

router.use(
  "/images",
  express.static(path.join(__dirname, "../../public/images"))
);

router.get("/images", async (_, res) => {
  const data = await readImagesDataAsString();
  res.type("application/json").send(data);
});

router.post("/images", upload.single("file"), processImage);

export default router;
