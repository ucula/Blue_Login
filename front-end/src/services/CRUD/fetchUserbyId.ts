import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";

export function fetchUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await useFetch(
        `http://localhost:5001/api/user/${id}`,
        "GET",
      );
      return data;
    },
  });
}
