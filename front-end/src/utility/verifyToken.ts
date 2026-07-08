import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/utility/useFetch";
import { API } from "@/config/path";
import { decodeToken } from "./decodeToken";

export function verifyToken(token: string) {
  const decoded = token ? decodeToken(token) : null;
  const id = decoded?.id || "";

  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("No token or invalid token");
      const { data } = await useFetch(API.USER_BY_ID(id), "GET");
      return data;
    },
    enabled: !!id,
  });
}
