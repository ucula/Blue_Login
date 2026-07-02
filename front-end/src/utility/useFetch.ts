import redirectLogin from "./redirectLogin";
import { Payload } from "./response/response";

export async function useFetch<T = any>(
  address: string,
  method: string,
  body?: any,
  headers?: Record<string, string>,
): Promise<T> {
  const token = localStorage.getItem("_session_state_id");
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

  redirectLogin(response.status);
  if (!response.ok) {
    const err = await response.json();
    throw new Payload(err);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
