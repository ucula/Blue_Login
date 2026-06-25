import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function sendEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      return await useFetch(
        "http://localhost:5001/api/user/reset/email",
        "POST",
        {
          email: email,
        },
      );
    },
  });
}
