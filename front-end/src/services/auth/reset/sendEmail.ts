import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";

export default function sendEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      return await useFetch(
        API.AUTH_RESET_PASSWORD,
        "POST",
        {
          email: email,
        },
      );
    },
  });
}
