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

  const mutation = useMutation(signInService, {
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
    register,
  };
}

export default useSignInUser;
