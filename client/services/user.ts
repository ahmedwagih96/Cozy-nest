import { UserType } from "@/types/mongoTypes";
import { RegisterFormData, SignInFormData } from "@/types/typings";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`;

export const registerService = async (
  formData: RegisterFormData
): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const signInService = async (formData: SignInFormData): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateTokenService = async (): Promise<UserType>  => {
  const response = await fetch(`${API_BASE_URL}/validate-token`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const signOutService = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
