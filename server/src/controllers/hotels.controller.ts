import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import {  NotFoundError } from "../errors";


const getHotelController = async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    throw new NotFoundError("Hotel Not Found");
  }
  res.status(200).json({ hotel });
};



export {
  getHotelController,
};
