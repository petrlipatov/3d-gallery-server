import sharp from "sharp";
import fs from "fs";
import path from "path";

interface SizeConfig {
  width: number;
  folder: string;
  quality: number;
}

const resizeImage = async (file: Express.Multer.File) => {
  const sizes: SizeConfig[] = [
    { width: 300, folder: "previews-mobile", quality: 60 },
    { width: 300, folder: "previews-desktop", quality: 100 },
    { width: 1200, folder: "images", quality: 100 },
  ];

  const resizedFiles: { size: number; path: string }[] = [];

  for (const { width, folder, quality } of sizes) {
    const outputDir = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "client",
      "public",
      folder
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, file.filename);

    console.log(outputPath);

    await sharp(file.path)
      .resize({ width })
      .jpeg({ quality })
      .toFile(outputPath);

    resizedFiles.push({ size: width, path: outputPath });
  }

  return resizedFiles;
};

export { resizeImage };
