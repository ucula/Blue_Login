import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default function redirectAdmin401(status: number) {
  if (status === HttpResponseCode.UNAUTHORIZED || status === HttpResponseCode.FORBIDDEN) {
    window.location.href = "/admin/home";
  }
}
