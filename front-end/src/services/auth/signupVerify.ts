import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function signupVerify() {
  return useMutation({
    mutationFn: async (token: string) => {
      return useFetch("http://localhost:5001/api/user/signup/verify", "POST", {
        token,
      });
    },
  });
}
