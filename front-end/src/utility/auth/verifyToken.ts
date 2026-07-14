import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/utility/http/useFetch";
import { API } from "@/constants";
import { decodeToken } from "./decodeToken";

export function verifyToken(token: string) {
  const decoded = token ? decodeToken(token) : null;
  const id = decoded?.id || "";

  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("No token or invalid token");
      if (decoded?.role === "admin") {
        const { data } = await useFetch(API.USER_BY_ID(id), "GET");
        return data;
      }
      return decoded;
    },
    enabled: !!id,
  });
}
