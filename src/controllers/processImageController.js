var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { resizeImage } = require("../services/resizeImageService");
const { addImagePath } = require("../services/linkSaver");
const processImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        const resizedFiles = yield resizeImage(req.file);
        addImagePath();
        res.json({
            message: "File uploaded and resized successfully",
            originalFile: req.file.filename,
            resizedFiles,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error processing file" });
    }
});
module.exports = { processImage };
