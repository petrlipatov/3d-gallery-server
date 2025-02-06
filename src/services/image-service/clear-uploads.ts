import path from "path";
import { promises as fs, constants } from "fs";

const UPLOADS_FOLDER_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "public",
  "uploads"
);

export const clearUploads = async (id: string) => {
  const imagePath = path.join(UPLOADS_FOLDER_PATH, `${id}.jpeg`);

  try {
    await fs.access(imagePath, constants.F_OK);
    await fs.unlink(imagePath);
  } catch (err) {
    console.log(`${imagePath} does not exist`);
  }
};
