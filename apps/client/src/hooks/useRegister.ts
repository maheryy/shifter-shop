import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "@/api/auth.api";
import { useAuthContext } from "./context";

function useRegister() {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      authenticate(data);

      navigate("/");
    },
    onError: (error) => {
      console.error(error);

      toast.error("An error occurred while registering");
    },
  });
}

export default useRegister;
