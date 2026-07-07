import type { User } from "@/types/user/user";
import { useFetch } from "@/utility/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/config/path";

export function patchUserById(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      return await useFetch<void>(
        API.USER_BY_ID(id),
        "PATCH",
        { updatedData },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}
