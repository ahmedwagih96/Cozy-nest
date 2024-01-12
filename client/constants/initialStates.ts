import { FiltersState, SearchQueries } from "@/types/typings";

export const initialQueriesState: SearchQueries = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
};

export const FiltersInitialState: FiltersState = {
  hotelType: "",
  starRating: "",
  maxPrice: 1000,
  facilities: "",
};
