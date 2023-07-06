import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "@/api/auth.api";
import { useAuthContext } from "./context";

function useRegister(redirectTo = "/") {
  const { authenticate } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (payload) => {
      authenticate(payload);

      navigate(redirectTo);
    },
    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("An error occurred while registering");
    },
  });
}

export default useRegister;
