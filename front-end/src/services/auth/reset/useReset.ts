import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

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
        `http://localhost:5001/api/user/reset/pass?token=${token}`,
        "PATCH",
        {
          email: email,
          pass: pass,
        },
      );
    },
  });
}
