import "dotenv/config";
import express from "express";
import cors from "cors";
import imagesRoutes from "./routes/imagesRoutes";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3300;

var corsOptions = {
  origin: "https://stepanplusdrawingultra.site",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", imagesRoutes);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB connection is open");
    }

    app.listen(port, async () =>
      console.log(`✅ Server running on port ${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
