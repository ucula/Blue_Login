import { PATHS } from "@/constants";

export function checkRoles(role?: string): string {
  if (role === "admin") return PATHS.ADMIN_HOME;
  if (role === "user") return PATHS.USER_HOME;
  return PATHS.LOGIN;
}
