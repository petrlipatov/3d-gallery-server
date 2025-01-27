import path from "path";
import { promises as fs } from "fs";

const DATA_PATH = path.join(__dirname, "..", "..", "public", "data.json");

export const saveData = async (data) => {
  const dataContent = JSON.stringify(data, null, 2);
  fs.writeFile(path.join(__dirname, "..", "data", "data.json"), dataContent);
};

export const readData = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

export const readDataAsString = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return data;
};
