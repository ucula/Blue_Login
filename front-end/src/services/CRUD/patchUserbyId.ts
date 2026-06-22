import { redirectLogin } from "@/types/redirectLogin";
import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function patchUserById(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      const response = await fetch(
        `http://localhost:5001/api/user/${id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ updatedData }),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        redirectLogin(response.status);
        const err = new Error(error.message);
        (err as any).errors = error.errors;
        throw err;
      }
      return;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}
