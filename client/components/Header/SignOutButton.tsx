"use client";
import { useMutation } from "react-query";
import { signOutService } from "@/services/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignOutButton = ({ mobile }: { mobile?: boolean }) => {
  const router = useRouter();
  const style = mobile
    ? "text-white duration-200 font-bold hover:pl-2 hover:bg-blue-600 rounded-md text-left"
    : "text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-md";

  const mutation = useMutation(signOutService, {
    onSuccess: async () => {
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button onClick={handleClick} className={style}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
