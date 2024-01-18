import { RegisterFormData } from "@/types/typings";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerService } from "@/services/user";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/mongoTypes";
import { initialRegisterFormData } from "@/constants/initialStates";
function useRegisterUser() {
  const router = useRouter();
  const { showToast, signInUser } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: initialRegisterFormData,
  });

  const mutation = useMutation(registerService, {
    onSuccess: async (user: UserType) => {
      signInUser(user);
      showToast({ message: "Registration Success!", type: "SUCCESS" });
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
    watch,
    register,
  };
}

export default useRegisterUser;
