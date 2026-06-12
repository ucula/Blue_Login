import type { Form } from "@/types/signlog";
import { useMutation } from "@tanstack/react-query";

export function Signup() {
  //   const queryClient = useQueryClient();
  return useMutation({
    // The variables passed to mutate() arrive here (e.g., newTodo)
    mutationFn: async (form: Form) => {
      const response = await fetch("http://localhost:5001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
  });
}
