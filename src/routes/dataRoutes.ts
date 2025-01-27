import express from "express";
import { readDataAsString } from "../services/imagesData";

const router = express.Router();

router.get("/images", async (_, res) => {
  const data = await readDataAsString();
  res.type("application/json").send(data);
});

export default router;
