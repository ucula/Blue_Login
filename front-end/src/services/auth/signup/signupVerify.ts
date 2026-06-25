import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";

export function signupVerify(token: string) {
  return useQuery({
    queryKey: ["signupVerify", token],
    queryFn: async () => {
      return await useFetch(
        `http://localhost:5001/api/user/signup/verify?token=${token}`,
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}
