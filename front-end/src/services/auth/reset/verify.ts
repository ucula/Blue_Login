import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/config/path";

export default function verify(token: string) {
  return useQuery({
    queryKey: ["newPassVerify", token],
    queryFn: async () => {
      return await useFetch(
        API.AUTH_RESET_VERIFY(token),
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}
