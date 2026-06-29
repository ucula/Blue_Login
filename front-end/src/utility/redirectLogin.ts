import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default function redirectLogin(status: number) {
  if (status === HttpResponseCode.UNAUTHORIZED) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}
