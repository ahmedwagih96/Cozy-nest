import { SearchQueries } from "@/types/typings";

export const initialQueriesState: SearchQueries = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
  adultCount: 1,
  childCount: 0,
};
