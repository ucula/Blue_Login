import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";

export function delUserById(id: string) {
  return useMutation({
    mutationFn: async () => {
      return await useFetch(`http://localhost:5001/api/user/${id}`, "DELETE");
    },
  });
}
