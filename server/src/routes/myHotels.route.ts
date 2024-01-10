import express from "express";
import {
  MediaUploadMiddleware,
  ValidateCreateHotel,
  ValidateObjectId,
  ValidateUpdateHotel,
  VerifyHotelOwnership,
  VerifyTokenMiddleware,
} from "../middleware";
import {
  createHotelController,
  getMyHotelsController,
  getMyHotelController,
  updateHotelController,
} from "../controllers/myHotels.controller";

const router = express.Router();

// Create Hotel
router.post(
  "/",
  VerifyTokenMiddleware,
  MediaUploadMiddleware.array("imageFiles", 6),
  ValidateCreateHotel,
  createHotelController
);

// Get All My Hotels
router.get("/", VerifyTokenMiddleware, getMyHotelsController);

//  Get My Single Hotel
router.get(
  "/:id",
  VerifyHotelOwnership,
  ValidateObjectId,
  getMyHotelController
);

// Update My Hotel
router.put(
  "/:id",
  VerifyHotelOwnership,
  ValidateObjectId,
  MediaUploadMiddleware.array("imageFiles"),
  ValidateUpdateHotel,
  updateHotelController
);


export default router;
