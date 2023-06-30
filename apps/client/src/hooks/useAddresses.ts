import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/api/profile.api";
import { Address } from "@/types/address";
import QueryKey from "@/types/query";

interface UseAddressesOptions {
  onSuccess?: (data: Address[]) => void;
}

function useAddresses({ onSuccess }: UseAddressesOptions) {
  return useQuery({
    queryKey: [QueryKey.enum.addresses],
    queryFn: getAddresses,
    onSuccess,
  });
}

export default useAddresses;
