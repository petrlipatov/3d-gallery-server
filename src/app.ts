import express from "express";
import path from "path";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes";
import dataRoutes from "./routes/dataRoutes";

const app = express();
const port = 3300;

// var corsOptions = {
//   origin: "https://stepanplusdrawingultra.site",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use(express.json());
app.use("/", dataRoutes);
app.use("/", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
