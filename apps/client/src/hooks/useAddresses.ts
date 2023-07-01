import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/api/profile.api";
import { TAddress } from "@/types/address";
import QueryKey from "@/types/query";

interface UseAddressesOptions {
  onSuccess?: (data: TAddress[]) => void;
}

function useAddresses(options?: UseAddressesOptions) {
  const { onSuccess } = options || {};

  return useQuery({
    queryKey: [QueryKey.enum.addresses],
    queryFn: getAddresses,
    onSuccess,
  });
}

export default useAddresses;
