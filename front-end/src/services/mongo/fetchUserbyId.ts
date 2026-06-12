import { useQuery } from "@tanstack/react-query";

const fetchUserById = async (id: string) => {
  const response = await fetch(`http://localhost:5001/api/user/${id}`);
  if (!response.ok) throw new Error("Network response failed");
  const data = await response.json();
  console.log(data);
  return data;
};

export function UserById(id: string) {
  return useQuery({
    queryKey: ["user", id], // unique cache per user ID
    queryFn: () => fetchUserById(id),
  });
}
