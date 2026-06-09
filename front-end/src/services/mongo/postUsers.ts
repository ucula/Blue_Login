import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function EditUsersList() {
  const queryClient = useQueryClient();
  return useMutation({
    // The variables passed to mutate() arrive here (e.g., newTodo)
    mutationFn: async (user: User) => {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },

    // Invalidate the cache to automatically trigger a background re-fetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
