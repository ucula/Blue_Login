import { useMutation } from "@tanstack/react-query";
import type { SignupForm } from "@/types/auth/auth";
import { useFetch } from "@/utility/useFetch";
import { API } from "@/config/path";

export function useSignup() {
  return useMutation({
    mutationFn: async (form: Partial<SignupForm>) => {
      return useFetch(API.AUTH_SIGNUP, "POST", form);
    },
  });
}
