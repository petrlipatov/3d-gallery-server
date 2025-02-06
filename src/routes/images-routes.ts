import express from "express";
import path from "path";
import { processImage } from "../controllers/process-image-controller";
import { upload } from "../middlewares/image-middleware";
import {
  readImagesDataAsString,
  removeImageData,
} from "../services/image-service";
import { deleteImage } from "../services/image-service/delete-image";

const router = express.Router();

router.use(
  "/images",
  express.static(path.join(__dirname, "../../public/images"))
);

router.get("/images", async (_, res, next) => {
  try {
    const data = await readImagesDataAsString();
    res.type("application/json").send(data);
  } catch (err) {
    next(err);
  }
});

router.post("/images", upload.single("file"), processImage);

router.delete("/images/:id", async (req, res, next) => {
  const { id } = req.params;
  const status = { id, data: null, removed: [] };
  try {
    await removeImageData(id, status);
    await deleteImage(id, status);
    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
});

export default router;
