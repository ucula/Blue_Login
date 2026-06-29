import type { Auth } from "@/types/auth/auth";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
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

      // Save token to localstorage
      localStorage.setItem("token", response.data.token);
    },
  });
}
