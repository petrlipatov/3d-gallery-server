import { saveResizedCopies } from "../services/saveResizedCopies";
// import { saveData } from "../services/writeData";

import { readFileSync } from "fs";
import { join } from "path";

const IMAGES = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "public", "data.json"), "utf-8")
);

export const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const resizedFiles = await saveResizedCopies(req.file);

    IMAGES.push({
      small: `/small/${IMAGES.length}.jpeg`,
      medium: `/medium/${IMAGES.length}.jpeg`,
      large: `/large/${IMAGES.length}.jpeg`,
    });

    // saveData();

    res.json({
      message: "File uploaded and resized successfully",
      originalFile: req.file.filename,
      resizedFiles,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing file" });
  }
};
