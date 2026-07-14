import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/utility/http/useFetch";
import { API } from "@/constants";

export function sendEmail(id: string = "resend") {
  return useMutation({
    mutationFn: async ({ email, path }: { email: string; path?: string }) => {
      return useFetch(API.ADMIN_SEND_EMAIL(id), "POST", {
        email,
        path,
      });
    },
  });
}
