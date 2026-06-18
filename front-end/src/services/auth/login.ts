import type { User } from "@/types/user";

export async function logIn(user: Partial<User>) {
  const response = await fetch("http://localhost:5001/api/user/login", {
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

  const data = await response.json();
  localStorage.setItem("token", data.token);
}

