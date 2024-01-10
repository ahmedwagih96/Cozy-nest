import { HotelType } from "@/types/mongoTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-hotels`;

export const createHotelService = async (
  hotelFormData: FormData
): Promise<{
  hotel: HotelType;
}> => {
  const response = await fetch(`${API_BASE_URL}`, {
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
  const response = await fetch(`${API_BASE_URL}`, {
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
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
