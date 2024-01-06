import { Document, ObjectId } from "mongoose";

interface UserType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserDocument extends Document, UserType {
  generateAuthToken(): string;
}

interface Image {
  url: string;
  publicId: string;
}

export interface HotelDocument extends Document {
  user: ObjectId;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: Image[];
}
