import React, { useContext, useEffect, useState } from "react";
import { AppContext, ToastMessage } from "@/types/typings";
import { Toast } from "@/components";
import { UserType } from "@/types/mongoTypes";
import { useQuery } from "react-query";
import { validateTokenService } from "@/services/user";

const AppContext = React.createContext<AppContext | undefined>(undefined);

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
      setUser(data.user);
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
