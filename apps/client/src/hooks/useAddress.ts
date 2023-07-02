import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
} from "@/api/profile.api";
import QueryKey from "@/types/query";

function useAddress() {
  const queryClient = useQueryClient();

  const createAddressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.enum.addresses]);

      toast.success("Address created successfully");
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.enum.addresses]);

      toast.success("Address deleted successfully");
    },
  });

  const editAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.enum.addresses]);

      toast.success("Address updated successfully");
    },
  });

  const setDefaultAddressMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.enum.addresses] });

      toast.success("Default address updated successfully");
    },
  });

  return {
    createAddressMutation,
    deleteAddressMutation,
    editAddressMutation,
    setDefaultAddressMutation,
  };
}

export default useAddress;
