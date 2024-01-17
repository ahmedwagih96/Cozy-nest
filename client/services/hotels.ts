import { HotelType } from "@/types/mongoTypes";
import { PaginationResponse } from "@/types/typings";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hotels`;

export const fetchHotelByIdService = async (
  hotelId: string
): Promise<{ hotel: HotelType }> => {
  const response = await fetch(`${API_BASE_URL}/${hotelId}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const searchHotelsService = async (
  params: string = ''
): Promise<{hotels: HotelType[], pagination: PaginationResponse}> => {
  const response = await fetch(`${API_BASE_URL}?${params}`);

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
