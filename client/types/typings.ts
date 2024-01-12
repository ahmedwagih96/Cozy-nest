import { HotelType, UserType } from "./mongoTypes";

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

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  signInUser: (user: UserType) => void;
  signOutUser: () => void;
  user: UserType | null;
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
