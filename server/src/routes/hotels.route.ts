import express from "express";
import {
  MediaUploadMiddleware,
  ValidateCreateHotel,
  VerifyTokenMiddleware,
} from "../middleware";
import {
  createHotelController,
  getHotelsByUserController,
} from "../controllers/hotels.controller";

const router = express.Router();

router.post(
  "/",
  VerifyTokenMiddleware,
  MediaUploadMiddleware.array("imageFiles", 6),
  ValidateCreateHotel,
  createHotelController
);

router.get("/my-hotels", VerifyTokenMiddleware, getHotelsByUserController);

export default router;
