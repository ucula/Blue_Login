import { useMutation } from "@tanstack/react-query";

export function verifyValue() {
  return useMutation({
    mutationFn: async ({
      key,
      value,
      label,
    }: {
      key: string;
      value: string;
      label: string;
    }) => {
      const response = await fetch("http://localhost:5001/api/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value, label }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message);
      }

      return true;
    },
  });
}
