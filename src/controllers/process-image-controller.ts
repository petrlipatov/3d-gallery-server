import { saveResizedCopies } from "../services/image-service/resize-image";
import {
  readImagesData,
  saveImagesData,
  clearUploads,
} from "../services/image-service";

export const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const resizedFiles = await saveResizedCopies(req.file);
    const imagesData = await readImagesData();
    const id = imagesData[imagesData.length - 1].id + 1;

    imagesData.push({
      small: `/small/${id}.jpeg`,
      medium: `/medium/${id}.jpeg`,
      large: `/large/${id}.jpeg`,
      id: id,
    });

    saveImagesData(imagesData);
    await clearUploads(id);

    return res.json({
      message: "File uploaded and resized successfully",
      originalFile: req.file.filename,
      resizedFiles,
    });
    
  } catch (error) {
    return res.status(500).json({ error: "Error processing file" });
  }
};
