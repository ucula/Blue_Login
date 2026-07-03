import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/config/path";

export function fetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await useFetch(API.USERS, "GET");
      return data;
    },
  });
}
