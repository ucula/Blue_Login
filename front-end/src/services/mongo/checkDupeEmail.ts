export async function checkDupeEmail(email: string) {
  const response = await fetch("http://localhost:5001/api/user/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, isDupe: false }),
  });
  if (!response.ok) throw new Error("Network response failed");
  // console.log(response.json());
  return response.json();
}
