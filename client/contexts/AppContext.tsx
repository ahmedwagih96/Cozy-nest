import React, { useContext, useEffect, useState } from "react";
import { AppContext, ToastMessage } from "@/types/typings";
import { Toast } from "@/components";
import { UserType } from "@/types/mongoTypes";
import { useQuery } from "react-query";
import { validateTokenService } from "@/services/user";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY || "";
const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [user, setUser] = useState<UserType | null>(null);
  const { isError, data, isSuccess } = useQuery(
    "validateToken",
    validateTokenService,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (isError) {
      setUser(null);
    }
    if (isSuccess) {
      setUser(data);
    }
  }, [isError, isSuccess, data]);

  return (
    <AppContext.Provider
      value={{
        showToast: (newToast) => {
          setToast(newToast);
        },
        signInUser: (newUser) => {
          setUser(newUser);
        },
        signOutUser: () => {
          setUser(null);
        },
        user,
        stripePromise,
      }}
    >
      {toast ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      ) : null}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
