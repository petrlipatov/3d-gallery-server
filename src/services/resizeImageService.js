"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resizeImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const sizes = [
        { width: 300, folder: "previews-mobile", quality: 60 },
        { width: 300, folder: "previews-desktop", quality: 100 },
        { width: 1200, folder: "images", quality: 100 },
    ];
    const resizedFiles = [];
    for (const { width, folder, quality } of sizes) {
        const outputDir = path_1.default.join(__dirname, "..", "..", "..", "client", "public", folder);
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path_1.default.join(outputDir, file.filename);
        console.log(outputPath);
        yield (0, sharp_1.default)(file.path)
            .resize({ width })
            .jpeg({ quality })
            .toFile(outputPath);
        resizedFiles.push({ size: width, path: outputPath });
    }
    return resizedFiles;
});
exports.resizeImage = resizeImage;
