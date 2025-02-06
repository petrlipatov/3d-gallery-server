import multer from "multer";
import path from "path";
import fs from "fs";
import { readImagesData } from "../services/image-service";

const uploadDir = path.resolve(__dirname, "..", "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: async (req, file, cb) => {
    const images = await readImagesData();
    cb(null, `${images.length}.jpeg`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
