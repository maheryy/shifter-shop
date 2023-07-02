import { useQuery } from "@tanstack/react-query";
import { profile } from "@/api/auth.api";
import QueryKey from "@/types/query";

function useProfile() {
  return useQuery({
    queryKey: [QueryKey.enum.user],
    queryFn: profile,
  });
}

export default useProfile;
