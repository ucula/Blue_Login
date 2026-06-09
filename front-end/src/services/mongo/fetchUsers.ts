// import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("http://localhost:5001/api/users");
  if (!response.ok) throw new Error("Network response failed");
  const data = await response.json();
  // console.log(data);
  return data;
};

export function UsersList() {
  return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
}
