import { redirectLogin } from "@/types/redirectLogin";
import { useQuery } from "@tanstack/react-query";

export function fetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5001/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        redirectLogin(response.status);
        throw new Error(error.message);
      }
      return response.json();
    },
  });
}
