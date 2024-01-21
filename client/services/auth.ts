import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/validate-token`;

export const isAuthenticated = async (): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!response.ok) {
    return false;
  }
  return true;
};
