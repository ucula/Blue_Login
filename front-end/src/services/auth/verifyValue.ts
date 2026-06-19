export async function verifyValue(key: string, value: string) {
  const response = await fetch("http://localhost:5001/api/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: key, value: value }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return true;
}
