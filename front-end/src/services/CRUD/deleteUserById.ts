import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function DelUserById() {
  // const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:5001/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
