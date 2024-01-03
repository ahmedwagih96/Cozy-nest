"use client";
import { useQuery } from "react-query";
import { signOutService } from "@/services/user";
import { useAppContext } from "@/contexts/AppContext";

const SignOutButton = () => {
  const { showToast, signOutUser } = useAppContext();

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
    <button
      onClick={() => refetch()}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
