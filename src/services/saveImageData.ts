import path from "path";
import fs from "fs";
import IMAGES from "../data/data.json";

export function saveData() {
  const dataContent = JSON.stringify(IMAGES, null, 2);
  fs.writeFileSync(
    path.join(__dirname, "..", "data", "data.json"),
    dataContent
  );
}
