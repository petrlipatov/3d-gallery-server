import fs from "fs";
import sharp from "sharp";
import path from "path";

interface SizeConfig {
  width: number;
  folder: string;
  quality: number;
}

export const saveResizedCopies = async (file: Express.Multer.File) => {
  const sizes: SizeConfig[] = [
    { width: 300, folder: "small", quality: 60 },
    { width: 300, folder: "medium", quality: 100 },
    { width: 1200, folder: "large", quality: 100 },
  ];

  const resizedFiles: { size: number; path: string }[] = [];

  for (const { width, folder, quality } of sizes) {
    const outputDir = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "images",
      folder
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, file.filename);

    await sharp(file.path)
      .resize({ width })
      .jpeg({ quality })
      .toFile(outputPath);

    resizedFiles.push({ size: width, path: outputPath });
  }

  return resizedFiles;
};
