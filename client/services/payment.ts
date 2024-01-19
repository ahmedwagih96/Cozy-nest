import { PaymentIntentResponse } from "@/types/typings";
import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments`;

export const createPaymentIntentService = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(`${API_BASE_URL}/${hotelId}`, {
    method: "POST",
    body: JSON.stringify({ numberOfNights }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
