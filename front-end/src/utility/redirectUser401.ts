import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default function redirectUser401(status: number) {
  if (status === HttpResponseCode.UNAUTHORIZED || status === HttpResponseCode.FORBIDDEN) {
    window.location.href = "/user";
  }
}
