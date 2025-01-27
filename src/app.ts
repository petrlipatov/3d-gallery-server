import express from "express";
import path from "path";
import cors from "cors";
import imagesRoutes from "./routes/imagesRoutes";

const app = express();
const port = 3300;

// var corsOptions = {
//   origin: "https://stepanplusdrawingultra.site",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use("/", imagesRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
