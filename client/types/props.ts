export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export type ManageHotelFormProps = {
  loading: boolean;
  onSave: (hotelFormData: FormData) => void;
};
