import path from "path";
import { promises as fs } from "fs";

const DATA_PATH = path.join(__dirname, "..", "..", "..", "public", "data.json");

export const saveImagesData = async (data) => {
  const dataContent = JSON.stringify(data, null, 2);
  fs.writeFile(DATA_PATH, dataContent);
};

export const readImagesData = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

export const readImagesDataAsString = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return data;
};

export const removeImageData = async (id: string, resStatus) => {
  const data = await readImagesData();
  const filteredData = data.filter((el) => el.id !== Number(id));
  await saveImagesData(filteredData);
  resStatus.data = "filtered";
};
