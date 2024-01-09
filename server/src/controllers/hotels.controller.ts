import { Request, Response } from "express";
import {
  uploadImagesToCloudinary,
  deleteImagesFromCloudinary,
} from "../utils/cloudinary";
import { HotelDocument } from "../shared/types";
import { ObjectId } from "mongoose";
import Hotel from "../models/hotel.model";
import { BadRequestError, NotFoundError } from "../errors";

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

const getMyHotelsController = async (req: Request, res: Response) => {
  const hotels = await Hotel.find({ user: req.userId });
  res.status(200).json({ hotels });
};

const getMyHotelController = async (req: Request, res: Response) => {
  const hotel = req.hotel;
  res.status(200).json({ hotel });
};

const getHotelByIdController = async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    throw new NotFoundError("Hotel Not Found");
  }
  res.status(200).json({ hotel });
};

const updateHotelController = async (req: Request, res: Response) => {
  const updatedHotel: HotelDocument = req.body;
  const currentHotel = req.hotel;

  // Check if images uploaded to cloudinary is to be deleted
  const deletedImages = currentHotel.imageUrls.filter(
    (image) =>
      !updatedHotel.imageUrls.some(
        (newImage) => newImage.publicId === image.publicId
      )
  );

  if (deletedImages.length) {
    const publicIds = deletedImages.map((image) => image.publicId);
    await deleteImagesFromCloudinary(publicIds);
  }

  // check if new images is added
  const imageFiles = req.files as Express.Multer.File[];
  if (imageFiles && imageFiles.length) {
    // upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const res = await uploadImagesToCloudinary(image);
      return res;
    });
    const newImages = await Promise.all(uploadPromises);

    updatedHotel.imageUrls = [...newImages, ...(updatedHotel.imageUrls || [])];
  }

  // update the hotel
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, updatedHotel, {
    new: true,
  });

  res.status(200).json({ hotel });
};

export {
  createHotelController,
  getMyHotelsController,
  getHotelByIdController,
  getMyHotelController,
  updateHotelController,
};
