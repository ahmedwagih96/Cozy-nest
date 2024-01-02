import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connect";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express endpoint!" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CLOUD_URI as string);
    app.listen(8000, () => console.log("Server is running"));
  } catch (error) {
    console.log(error);
  }
};

start();