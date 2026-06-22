import { redirectLogin } from "@/types/redirectLogin";

export async function useFetch<T = any>(
  address: string,
  method: string = "GET",
  body?: any,
  headers?: Record<string, string>
): Promise<T> {
  const token = localStorage.getItem("token");
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(address, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    redirectLogin(response.status);
    const err = new Error(data.message || "Request failed");
    (err as any).errors = data.errors;
    (err as any).status = response.status;
    throw err;
  }

  // Handle empty bodies safely (e.g. 204 or 201 with no body)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json().catch(() => ({}));
}
