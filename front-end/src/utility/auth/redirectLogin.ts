import { TOKEN_NAME } from "@/config";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default function redirectLogin(status: number) {
  if (status === HttpResponseCode.UNAUTHORIZED) {
    localStorage.removeItem(TOKEN_NAME);
    window.location.href = "/";
  }
}
