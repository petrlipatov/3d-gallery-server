import express from "express";
import path from "path";

import { promises as fs, constants } from "fs";
import { processImage } from "../controllers/processImageController";
import { upload } from "../middlewares/multerConfig";
import {
  readImagesDataAsString,
  removeImageData,
} from "../services/imagesData";

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

const IMAGE_FOLDER_PATH = path.join(__dirname, "..", "..", "public", "images");
const UPLOADS_FOLDER_PATH = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "uploads"
);

const deleteImageFiles = async (id: string, resStatus) => {
  const imagePaths = [
    path.join(IMAGE_FOLDER_PATH, "small", `${id}.jpeg`),
    path.join(IMAGE_FOLDER_PATH, "medium", `${id}.jpeg`),
    path.join(IMAGE_FOLDER_PATH, "large", `${id}.jpeg`),
    path.join(UPLOADS_FOLDER_PATH, `${id}.jpeg`),
  ];

  const deletePromises = imagePaths.map(async (imagePath) => {
    try {
      await fs.access(imagePath, constants.F_OK);
      await fs.unlink(imagePath);
      resStatus.removed.push(imagePath);
    } catch (err) {
      console.log(`${imagePath} does not exist`);
    }
  });

  await Promise.all(deletePromises);
};

router.delete("/images/:id", async (req, res) => {
  const { id } = req.params;
  const status = { id, data: null, removed: [] };

  try {
    await removeImageData(id, status);
    await deleteImageFiles(id, status);
    res.status(200).json(status);
  } catch (err) {
    console.error("Ошибка при удалении файла:", err);
    res.status(500).send("Не удалось удалить файл");
  }
});

export default router;
