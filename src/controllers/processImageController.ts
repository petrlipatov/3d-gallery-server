const { resizeImage } = require("../services/resizeImageService");
const { addImagePath } = require("../services/linkSaver");

const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const resizedFiles = await resizeImage(req.file);
    addImagePath();

    res.json({
      message: "File uploaded and resized successfully",
      originalFile: req.file.filename,
      resizedFiles,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing file" });
  }
};

module.exports = { processImage };
