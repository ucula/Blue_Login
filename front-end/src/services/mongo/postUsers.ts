import type { Form } from "@/types/signlog";
import { useMutation } from "@tanstack/react-query";

export function addUser() {
  // const queryClient = useQueryClient();
  return useMutation({
    // The variables passed to mutate() arrive here (e.g., newTodo)
    mutationFn: async (user: Partial<Form>) => {
      const response = await fetch("http://localhost:5001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response error");
      }

      return response.json();
    },

    // Invalidate the cache to automatically trigger a background re-fetch
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["users"] });
    // },
  });
}
