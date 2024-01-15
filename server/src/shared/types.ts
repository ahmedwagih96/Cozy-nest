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

export interface BookingDocument extends Document {
  user: ObjectId;
  hotel: ObjectId;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
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

export interface SearchResponse {
  hotels: HotelDocument[];
  pagination: Pagination;
}

interface Pagination {
  total: number;
  pages: number;
}

export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}
