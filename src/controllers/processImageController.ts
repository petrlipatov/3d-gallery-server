import { saveResizedCopies } from "../services/saveResizedCopies";
// import { saveData } from "../services/writeData";

import { readFileSync } from "fs";
import { join } from "path";
import { readImagesData, saveImagesData } from "../services/imagesData";

export const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const resizedFiles = await saveResizedCopies(req.file);
    const imagesData = await readImagesData();

    imagesData.push({
      small: `/small/${imagesData.length}.jpeg`,
      medium: `/medium/${imagesData.length}.jpeg`,
      large: `/large/${imagesData.length}.jpeg`,
    });

    saveImagesData(imagesData);

    res.json({
      message: "File uploaded and resized successfully",
      originalFile: req.file.filename,
      resizedFiles,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing file" });
  }
};
