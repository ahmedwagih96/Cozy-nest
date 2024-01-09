import { HotelType } from "@/types/mongoTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createHotelService = async (
  hotelFormData: FormData
): Promise<{
  hotel: HotelType;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchMyHotelsService = async (): Promise<{
  hotels: HotelType[];
}> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/my-hotels`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
export const fetchMyHotelByIdService = async (
  id: string
): Promise<{
  hotel: HotelType;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/my-hotels/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchHotelByIdService = async (
  hotelId: string
): Promise<{ hotel: HotelType }> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const updateHotelService = async (
  hotelFormData: FormData
): Promise<{ hotel: HotelType }> => {
  const id = hotelFormData.get("hotelId");
  console.log(id);
  hotelFormData.delete("hotelId");
  const response = await fetch(`${API_BASE_URL}/api/hotels/${id}`, {
    method: "PUT",
    body: hotelFormData,
    credentials: "include",
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
