import { BookingType, HotelType } from "@/types/mongoTypes";
import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const fetchMyHotelsService = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, {
    headers: { Cookie: cookies().toString() },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const errMsg = `${response.status}-${responseBody.message}`;
    throw new Error(errMsg);
  }

  return responseBody;
};

export const fetchMyHotelByIdService = async (
  id: string
): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${id}`, {
    headers: { Cookie: cookies().toString() },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    const errMsg = `${response.status}-${responseBody.message}`;
    throw new Error(errMsg);
  }

  return responseBody;
};

export const fetchMyBookingsService = async (): Promise<BookingType[]> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    headers: { Cookie: cookies().toString() },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    const errMsg = `${response.status}-${responseBody.message}`;
    throw new Error(errMsg);
  }

  return responseBody;
};

