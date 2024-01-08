import { Request, Response } from "express";
import uploadImagesToCloudinary from "../utils/cloudinary";
import { HotelDocument } from "../shared/types";
import { ObjectId } from "mongoose";
import Hotel from "../models/hotel.model";
import { BadRequestError } from "../errors";

const createHotelController = async (req: Request, res: Response) => {
  const imageFiles = req.files as Express.Multer.File[];
  if (!imageFiles.length) {
    throw new BadRequestError("Images are Required");
  }

  // upload images to cloudinary
  const uploadPromises = imageFiles.map(async (image) => {
    const res = await uploadImagesToCloudinary(image);
    return res;
  });
  const images = await Promise.all(uploadPromises);

  // Create New Hotel
  const newHotel: HotelDocument = req.body;
  newHotel.imageUrls = images;
  newHotel.user = req.userId as unknown as ObjectId;
  const hotel = new Hotel(newHotel);
  await hotel.save();

  // response to client
  res.status(201).json({ hotel });
};

const getHotelsByUserController = async (req: Request, res: Response) => {
  const hotels = await Hotel.find({ user: req.userId });
  res.status(200).json({ hotels });
};

export { createHotelController, getHotelsByUserController };
