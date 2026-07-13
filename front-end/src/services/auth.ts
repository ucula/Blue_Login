import { useFetch } from "@/utility/useFetch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { API } from "@/constants";
import { TOKEN_NAME } from "@/config";
import type { LoginForm, SignupForm } from "@/types/auth/auth";

export function useLogin() {
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

export function useSignup() {
  return useMutation({
    mutationFn: async (form: Partial<SignupForm>) => {
      return useFetch(API.AUTH_SIGNUP, "POST", form);
    },
  });
}

export function verify(token: string) {
  return useQuery({
    queryKey: ["signupVerify", token],
    queryFn: async () => {
      return await useFetch(
        API.AUTH_SIGNUP_VERIFY(token),
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}

export function resetVerify(token: string) {
  return useQuery({
    queryKey: ["newPassVerify", token],
    queryFn: async () => {
      return await useFetch(
        API.AUTH_RESET_VERIFY(token),
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}

export function useReset() {
  return useMutation({
    mutationFn: async ({
      email,
      pass,
      token,
    }: {
      email: string;
      pass: string;
      token: string;
    }) => {
      return await useFetch(
        API.AUTH_RESET_WITH_TOKEN(token),
        "PATCH",
        {
          email: email,
          pass: pass,
        },
      );
    },
  });
}
