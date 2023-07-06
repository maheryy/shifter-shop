import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { checkout } from "@/api/payment.api";

function useCheckout() {
  return useMutation({
    mutationFn: checkout,
    onSuccess: ({ url }) => {
      window.location.assign(url);
    },

    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("An error occurred while checking out");
    },
  });
}

export default useCheckout;
