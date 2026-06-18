import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export function postUser() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      const response = await fetch("http://localhost:5001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const err = new Error(data.message);
        (err as any).errors = data.errors;
        throw err;
      }

      return;
    },
  });
}
