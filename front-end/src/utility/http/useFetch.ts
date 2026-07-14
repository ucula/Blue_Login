import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import redirectLogin from "../auth/redirectLogin";
import { Payload } from "../response/response";
import { TOKEN_NAME } from "@/config";

export async function useFetch<T = any>(
  address: string,
  method: string,
  body?: any,
  headers?: Record<string, string>,
): Promise<T> {
  const token = localStorage.getItem(TOKEN_NAME);
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

  if (response.status === HttpResponseCode.NO_CONTENT) {
    return {} as T;
  }

  return response.json();
}
