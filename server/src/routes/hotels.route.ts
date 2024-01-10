import express from "express";
import { ValidateObjectId } from "../middleware";
import { getHotelController } from "../controllers/hotels.controller";

const router = express.Router();

// Get Single Hotel
router.get("/:id", ValidateObjectId, getHotelController);

export default router;
