import express from "express";
import { ValidateObjectId } from "../middleware";
import { getHotelController, getHotelsController } from "../controllers/hotels.controller";

const router = express.Router();

// Get All Hotels 
router.get("/", getHotelsController);

// Get Single Hotel
router.get("/:id", ValidateObjectId, getHotelController);

export default router;
