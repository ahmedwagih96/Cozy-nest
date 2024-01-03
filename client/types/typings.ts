export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};
