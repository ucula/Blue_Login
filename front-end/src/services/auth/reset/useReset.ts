import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";

export default function useReset() {
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
