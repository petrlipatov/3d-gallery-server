export const express = require("express");
const path = require("path");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const port = 3300;

var corsOptions = {
  origin: "https://stepanplusdrawingultra.site",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use(express.json());
app.use("/", dataRoutes);
app.use("/", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
