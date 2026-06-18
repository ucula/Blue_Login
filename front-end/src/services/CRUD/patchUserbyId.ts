import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function patchUserById(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      const response = await fetch(`http://localhost:5001/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ updatedData }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message);
      }
      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}
