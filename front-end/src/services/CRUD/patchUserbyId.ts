import { useFetch } from "@/utility/useFetch";
import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function patchUserById(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      return await useFetch<void>(
        `http://localhost:5001/api/user/${id}/edit`,
        "PATCH",
        { updatedData }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}
