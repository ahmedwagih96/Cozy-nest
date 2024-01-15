import mongoose from "mongoose";
import { BookingDocument } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingDocument>(
  {
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    totalCost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<BookingDocument>("Booking", bookingSchema);

export default Booking;
