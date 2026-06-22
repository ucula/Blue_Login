import { useFetch } from "@/utility/useFetch";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export function postUser() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await useFetch<void>(
        "http://localhost:5001/api/user",
        "POST",
        user
      );
    },
  });
}
