import { BookingType } from "@/types/mongoTypes";
import { BookingData } from "@/types/typings";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`;


export const createRoomBookingService = async (formData: BookingData) => {
  const response = await fetch(`${API_BASE_URL}/${formData.hotelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchMyBookingsService = async (): Promise<BookingType[]> => {
  const response = await fetch(`${API_BASE_URL}`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody);
  }

  return responseBody;
};
