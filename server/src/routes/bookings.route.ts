import express from "express";
const router = express.Router();
import {
  createBookingController,
  getMyBookingsController,
} from "../controllers/bookings.controller";
import {
  ValidateObjectId,
  ValidatePaymentIntent,
  VerifyTokenMiddleware,
} from "../middleware";

router.get("/", VerifyTokenMiddleware, getMyBookingsController);

router.post(
  "/:id",
  VerifyTokenMiddleware,
  ValidateObjectId,
  ValidatePaymentIntent,
  createBookingController
);

export default router;
