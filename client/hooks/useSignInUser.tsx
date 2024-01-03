import { SignInFormData } from "@/types/typings";
import { useForm } from "react-hook-form";
import { signInService } from "@/services/user";
import { useMutation } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/mongoTypes";
function useSignInUser() {
  const router = useRouter();
  const { showToast, signInUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(signInService, {
    onSuccess: async ({ user }: { user: UserType }) => {
      signInUser(user);
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      router.push("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    onSubmit,
    errors,
    register,
  };
}

export default useSignInUser;
