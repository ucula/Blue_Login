import { useFetch } from "@/utility/useFetch";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function fetchUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      return await useFetch<User>(`http://localhost:5001/api/user/${id}`);
    },
  });
}
