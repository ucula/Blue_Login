import type { LoginForm } from "@/types/auth/auth";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";
import { TOKEN_NAME } from "@/config";

export default function useLogin() {
  return useMutation({
    mutationFn: async (form: Partial<LoginForm>) => {
      const response = await useFetch(API.AUTH_LOGIN, "POST", {
        email: form.email,
        pass: form.pass,
      });

      // Save token to localstorage
      localStorage.setItem(TOKEN_NAME, response.data.token);
    },
  });
}
