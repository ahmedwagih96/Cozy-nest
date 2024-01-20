"use client";
import { useQuery } from "react-query";
import { signOutService } from "@/services/user";
import { useAppContext } from "@/contexts/AppContext";

const SignOutButton = ({ mobile }: { mobile?: boolean }) => {
  const { showToast, signOutUser } = useAppContext();
  const style = mobile
    ? "text-white duration-200 font-bold hover:pl-2 hover:bg-blue-600 rounded-md text-left"
    : "text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-md";

  const { refetch, isError, isSuccess, error } = useQuery(
    "signOut",
    signOutService,
    {
      enabled: false,
    }
  );

  if (isSuccess) {
    signOutUser();
    showToast({ message: "Signed Out!", type: "SUCCESS" });
  }

  if (isError && error) {
    showToast({ message: (error as Error).message, type: "ERROR" });
  }

  return (
    <button onClick={() => refetch()} className={style}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
