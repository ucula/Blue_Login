import { ALLOWED_ROLES } from "@/config";
import { AppError } from "../express/error";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export function checkRoles(payload: any, role: string) {
  if (ALLOWED_ROLES.includes(role)) {
    if (payload.role !== role)
      throw new AppError(HttpResponseCode.UNAUTHORIZED, "Invalid role");
    return;
  }
  throw new AppError(HttpResponseCode.BAD_REQUEST, "Role not configured");
}
