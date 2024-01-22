import { BookingDetails } from "./props";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};


export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: Image[];
  adultCount: number;
  childCount: number;
};

type Image = {
  url: string;
  publicId: string;
};

export type SearchQueries = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
};

export interface PaginationResponse {
  total: number;
  pages: number;
}

export interface FiltersState {
  hotelType: string[];
  starRating: string[];
  maxPrice: number;
  facilities: string[];
}

export type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export type BookingData = {
  bookingDetails: BookingDetails,
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}

export type SearchParamsQueries = {
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  hotelType?: string;
  starRating?: string;
  maxPrice?: string;
  facilities?: string;
  pageNumber?: string;
  sort?: string;
  destination?: string
};