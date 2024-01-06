import express from "express";
import {
  MediaUploadMiddleware,
  ValidateCreateHotel,
  VerifyTokenMiddleware,
} from "../middleware";
import { createHotelController } from "../controllers/hotels.controller";

const router = express.Router();

router.post(
  "/",
  VerifyTokenMiddleware,
  ValidateCreateHotel,
  MediaUploadMiddleware.array("imageFiles", 6),
  createHotelController
);

export default router;
