import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "@/api/user.api";
import QueryKey from "@/types/query";
import { useAuthContext } from "./context";

function useUser() {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.enum.user, token], data);

      toast.success("Your profile has been updated successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("Something went wrong");
    },
  });
}

export default useUser;
