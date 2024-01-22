import { RegisterFormData } from "@/types/typings";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerService } from "@/services/user";
import { initialRegisterFormData } from "@/constants/initialStates";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function useRegisterUser() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: initialRegisterFormData,
  });

  const mutation = useMutation(registerService, {
    onSuccess: async () => {
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
