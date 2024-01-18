import { RegisterFormData, SearchQueries } from "@/types/typings";

export const initialQueriesState: SearchQueries = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
  adultCount: 1,
  childCount: 0,
};

export const initialRegisterFormData: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
