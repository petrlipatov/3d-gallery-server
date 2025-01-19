const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const port = 3300;

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/", dataRoutes);
app.use("/", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
