import "dotenv/config";
import express from "express";
import cors from "cors";
import imagesRoutes from "./routes/images-routes";
import authRoutes from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler-middleware";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3300;

// const corsOptions = {
//   origin: "https://stepanplusdrawingultra.site",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   optionsSuccessStatus: 200,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

const allowedOrigins = [
  "https://stepanplusdrawingultra.site",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, origin);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      } else {
        console.log(origin, "Not allowed by CORS");
        return callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  })
);

app.use(cookieParser());

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
