import { HotelType } from "./mongoTypes";

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export type ManageHotelFormProps = {
  hotel?: HotelType;
  loading: boolean;
  onSave: (hotelFormData: FormData) => void;
};

