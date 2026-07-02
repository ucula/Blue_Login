import { useFetch } from "@/utility/useFetch";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/config/path";

export function delUserById(id: string) {
  return useMutation({
    mutationFn: async () => {
      return await useFetch(API.USER_BY_ID(id), "DELETE");
    },
  });
}
