import express from "express";
const router = express.Router();

import {
  createPaymentIntentController,
} from "../controllers/payment.controller";
import { ValidateObjectId, VerifyTokenMiddleware } from "../middleware";

router.post(
  "/:id",
  VerifyTokenMiddleware,
  ValidateObjectId,
  createPaymentIntentController
);

export default router;
