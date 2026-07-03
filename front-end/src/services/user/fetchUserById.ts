import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/config/path";

export function fetchUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await useFetch(
        API.USER_BY_ID(id),
        "GET",
      );
      return data;
    },
  });
}
