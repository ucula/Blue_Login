import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/utility/useFetch";
import { API } from "@/config/path";

export function sendEmail() {
  return useMutation({
    mutationFn: async ({ email, path }: { email: string; path: string }) => {
      return useFetch(API.AUTH_SIGNUP_RESEND, "POST", {
        email,
        path,
      });
    },
  });
}
