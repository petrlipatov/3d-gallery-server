import path from "path";
import { promises as fs, constants } from "fs";

const IMAGE_FOLDER_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "public",
  "images"
);

export const deleteImage = async (id: string, resStatus) => {
  const imagePaths = [
    path.join(IMAGE_FOLDER_PATH, "small", `${id}.jpeg`),
    path.join(IMAGE_FOLDER_PATH, "medium", `${id}.jpeg`),
    path.join(IMAGE_FOLDER_PATH, "large", `${id}.jpeg`),
  ];

  const deletePromises = imagePaths.map(async (imagePath) => {
    try {
      await fs.access(imagePath, constants.F_OK);
      await fs.unlink(imagePath);
      resStatus.removed.push(imagePath);
    } catch (err) {
      console.log(`${imagePath} does not exist`);
    }
  });

  await Promise.all(deletePromises);
};
