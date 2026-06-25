import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";

export function fetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await useFetch("http://localhost:5001/api/user", "GET");
      return data;
    },
  });
}
