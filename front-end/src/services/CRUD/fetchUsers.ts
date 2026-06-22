import { useFetch } from "@/utility/useFetch";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function fetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await useFetch<User[]>("http://localhost:5001/api/user");
    },
  });
}
