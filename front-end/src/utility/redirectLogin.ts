import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default function redirectLogin(status: number) {
  if (status === HttpResponseCode.UNAUTHORIZED) {
    localStorage.removeItem("_session_state_id");
    window.location.href = "/";
  }
}
