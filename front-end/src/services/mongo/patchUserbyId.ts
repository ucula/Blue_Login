import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function EditUserById() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      const response = await fetch(`http://localhost:5001/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedData }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}
