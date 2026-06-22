import type { Auth } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export function logIn() {
  return useMutation({
    mutationFn: async (form: Partial<Auth>) => {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          pass: form.pass,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
    },
  });
}
