import type { Auth } from "@/types/auth";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function logIn() {
  return useMutation({
    mutationFn: async (form: Partial<Auth>) => {
      const response = await useFetch(
        "http://localhost:5001/api/user/login",
        "POST",
        {
          email: form.email,
          pass: form.pass,
        },
      );
      localStorage.setItem("token", response.data.token);
    },
  });
}
