import { HotelType, UserType } from "./mongoTypes";
import { PaymentIntentResponse } from "./typings";

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export type ManageHotelFormProps = {
  hotel?: HotelType;
  loading: boolean;
  onSave: (hotelFormData: FormData) => void;
};

export type BookingDetailsSummaryProps = {
  bookingDetails: BookingDetails;
  numberOfNights: number;
  hotel: HotelType;
};

export type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export type BookingFormProps = {
  user: UserType;
  paymentIntent: PaymentIntentResponse;
  hotelId: string;
  bookingDetails: BookingDetails;
};
