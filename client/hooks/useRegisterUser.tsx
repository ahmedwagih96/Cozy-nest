import { RegisterFormData } from "@/types/typings";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerService } from "@/services/user";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
function useRegisterUser() {
  const router = useRouter();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation(registerService, {
    onSuccess: () => {
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
