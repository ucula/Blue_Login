import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/utility/useFetch";
import { API } from "@/config/path";

export function verify(token: string) {
  return useQuery({
    queryKey: ["signupVerify", token],
    queryFn: async () => {
      return await useFetch(
        API.AUTH_SIGNUP_VERIFY(token),
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}
