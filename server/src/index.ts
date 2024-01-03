import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./db/connect";
import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
import { NotFoundMiddleware, ErrorHandlerMiddleware } from "./middleware";
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CLOUD_URI as string);
    app.listen(8000, () => console.log("Server is running"));
  } catch (error) {
    console.log(error);
  }
};

start();
