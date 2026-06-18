import type { User } from "@/types/user";

export async function signUp(user: Partial<User>) {
  const response = await fetch("http://localhost:5001/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      pass: user.pass,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return;
}
