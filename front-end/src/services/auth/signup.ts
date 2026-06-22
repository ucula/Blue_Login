import type { User } from "@/types/user";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function signUp() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      return useFetch("http://localhost:5001/api/user/signup", "POST", user);
    },
  });
}
