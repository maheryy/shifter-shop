import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBusinessRequest } from "@/api/profile.api";

function useBusinessRequest() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBusinessRequest,
    onSuccess: () => {
      navigate("/business/register/finish");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("Something went wrong");
    },
  });
}

export default useBusinessRequest;
