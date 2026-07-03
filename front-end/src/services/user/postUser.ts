import type { User } from "@/types/user/user";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";

export function postUser() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await useFetch<void>(
        API.USERS,
        "POST",
        user,
      );
    },
  });
}
