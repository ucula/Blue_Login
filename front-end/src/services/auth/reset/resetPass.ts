import type { Form } from "@/types/form";
import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function resetPass() {
  return useMutation({
    mutationFn: async (form: Partial<Form>) => {
      return await useFetch(
        "http://localhost:5001/api/user/reset-pass",
        "PATCH",
        {
          email: form.email,
          pass: form.pass,
        },
      );
    },
  });
}
