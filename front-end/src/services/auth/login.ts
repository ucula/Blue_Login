import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export function loginHandler() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          pass: user.pass,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message);
      }

      return;
    },
  });
}
