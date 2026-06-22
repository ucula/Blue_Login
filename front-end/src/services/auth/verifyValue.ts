import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function verifyValue() {
  return useMutation({
    mutationFn: async ({
      key,
      value,
      label,
    }: {
      key: string;
      value: string;
      label: string;
    }) => {
      return await useFetch<boolean>(
        "http://localhost:5001/api/user/verify",
        "POST",
        { key, value, label }
      );
    },
  });
}
