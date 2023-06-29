import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "@/api/auth.api";
import { useAuthContext } from "./context";

function useLogin(redirectTo = "/") {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authenticate(data);

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

export default useLogin;
