import express from "express";
import path from "path";
import cors from "cors";
import imagesRoutes from "./routes/imagesRoutes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const port = 3300;

var corsOptions = {
  origin: "https://stepanplusdrawingultra.site",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", imagesRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
