import type { User } from "@/types/user";

export async function checkDupe(form: Partial<User>) {
  const response = await fetch("http://localhost:5001/api/user/check-dupe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      username: form.username,
    }),
  });
  if (!response.ok) throw new Error("Network response failed");
  return response.json();
}
