import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export function addUser() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
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
  });
}
