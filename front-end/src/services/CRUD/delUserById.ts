import { redirectLogin } from "@/types/redirectLogin";
import { useMutation } from "@tanstack/react-query";

export function delUserById(id: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:5001/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        redirectLogin(response.status);
        throw new Error(error.message);
      }

      return;
    },
  });
}
