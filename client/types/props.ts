export type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
  };