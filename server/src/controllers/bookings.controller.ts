import { Request, Response } from "express";
import Booking from "../models/booking.model";
import { ObjectId } from "mongoose";


const createBookingController = async (req: Request, res: Response) => {
  const newBooking = {
    user: req.userId as unknown as ObjectId,
    hotel: req.params.id as unknown as ObjectId,
    adultCount: Number(req.body.bookingDetails.adultCount),
    childCount: Number(req.body.bookingDetails.adultCount),
    checkIn: new Date(req.body.bookingDetails.checkIn),
    checkOut: new Date(req.body.bookingDetails.checkOut),
    totalCost: Number(req.body.totalCost),
  };
  const booking = new Booking(newBooking);
  await booking.save();
  res.status(200).send({ booking });
};

const getMyBookingsController = async (req: Request, res: Response) => {
  const bookings = await Booking.find({ user: req.userId })
    .populate("hotel")
    .sort("-createdAt");

  res.status(200).json(bookings);
};

export {
  createBookingController,
  getMyBookingsController,
};
