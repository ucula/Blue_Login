import type { LoginForm } from "@/types/auth/auth";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";

export default function useLogin() {
  return useMutation({
    mutationFn: async (form: Partial<LoginForm>) => {
      const response = await useFetch(API.AUTH_LOGIN, "POST", {
        email: form.email,
        pass: form.pass,
      });

      // Save token to localstorage
      localStorage.setItem("bazooka", response.data.token);
      localStorage.setItem("hotdog", response.data.id);
    },
  });
}
