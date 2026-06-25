import type { User } from "@/types/user";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function resetPass() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await useFetch(
        "http://localhost:5001/api/user/reset-pass",
        "PATCH",
        {
          email: user.email,
          pass: user.pass,
        },
      );
    },
  });
}
