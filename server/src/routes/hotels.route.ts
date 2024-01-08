import express from "express";
import {
  MediaUploadMiddleware,
  ValidateCreateHotel,
  ValidateObjectId,
  VerifyTokenMiddleware,
} from "../middleware";
import {
  createHotelController,
  getHotelsByUserController,
  getHotelByIdController
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
router.get('/:id', ValidateObjectId, getHotelByIdController)
export default router;
