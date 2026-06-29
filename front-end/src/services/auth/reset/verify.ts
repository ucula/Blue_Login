import { useFetch } from "@/utility/useFetch";
import { useQuery } from "@tanstack/react-query";

export default function verify(token: string) {
  return useQuery({
    queryKey: ["newPassVerify", token],
    queryFn: async () => {
      return await useFetch(
        `http://localhost:5001/api/user/reset/verify?token=${token}`,
        "GET",
      );
    },
    enabled: !!token,
    retry: false,
  });
}
