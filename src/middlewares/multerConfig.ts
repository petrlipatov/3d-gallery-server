import multer from "multer";
import path from "path";
import fs from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const IMAGES = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "public", "data.json"), "utf-8")
);

const uploadDir = path.resolve(__dirname, "..", "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${IMAGES.length}.jpeg`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
