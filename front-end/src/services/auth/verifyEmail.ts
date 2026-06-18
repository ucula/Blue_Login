export async function verifyEmail(email: string, type: string) {
  const response = await fetch("http://localhost:5001/api/user/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, type: type }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return true;
}
