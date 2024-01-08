import express from "express";
import {
  MediaUploadMiddleware,
  ValidateCreateHotel,
  ValidateObjectId,
  VerifyTokenMiddleware,
} from "../middleware";
import {
  createHotelController,
  getMyHotelsController,
  getHotelByIdController,
  getMyHotelController,
} from "../controllers/hotels.controller";

const router = express.Router();

router.post(
  "/",
  VerifyTokenMiddleware,
  MediaUploadMiddleware.array("imageFiles", 6),
  ValidateCreateHotel,
  createHotelController
);

router.get("/my-hotels", VerifyTokenMiddleware, getMyHotelsController);
router.get(
  "/my-hotels/:id",
  ValidateObjectId,
  VerifyTokenMiddleware,
  getMyHotelController
);
router.get("/:id", ValidateObjectId, getHotelByIdController);
export default router;
