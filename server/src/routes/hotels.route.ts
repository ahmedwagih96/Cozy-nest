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
  getHotelByIdController,
  getMyHotelController,
  updateHotelController,
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
  VerifyHotelOwnership,
  ValidateObjectId,
  getMyHotelController
);
router.put(
  "/:id",
  VerifyHotelOwnership,
  ValidateObjectId,
  MediaUploadMiddleware.array("imageFiles"),
  ValidateUpdateHotel,
  updateHotelController
);
router.get("/:id", ValidateObjectId, getHotelByIdController);
export default router;
