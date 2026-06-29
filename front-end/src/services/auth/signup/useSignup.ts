import { useMutation } from "@tanstack/react-query";
import type { UserForm } from "@/types/user/form";
import { useFetch } from "@/utility/useFetch";

export function useSignup() {
  return useMutation({
    mutationFn: async (form: Partial<UserForm>) => {
      return useFetch("http://localhost:5001/api/user/signup", "POST", form);
    },
  });
}
