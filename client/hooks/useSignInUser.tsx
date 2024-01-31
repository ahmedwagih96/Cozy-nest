import { SignInFormData } from "@/types/typings";
import { useForm } from "react-hook-form";
import { signInService } from "@/services/user";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function useSignInUser() {
  const router = useRouter();
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

  const { mutate, isLoading } = useMutation(signInService, {
    onSuccess: async () => {
      router.push('/')
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return {
    onSubmit,
    errors,
    register,
    isLoading,
  };
}

export default useSignInUser;
