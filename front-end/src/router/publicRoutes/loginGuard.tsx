import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "@/utility/auth/verifyToken";
import { TOKEN_NAME } from "@/config";
import { checkRoles } from "@/utility";

export function LoginGuard() {
  // First access case
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) return <Outlet />;

  // Already logged in case
  const { data: user, isPending, isError } = verifyToken(token);
  if (isPending) {
    return null;
  }

  if (isError || !user) {
    localStorage.removeItem(TOKEN_NAME);
    return <Outlet />;
  }

  if (user) {
    return <Navigate to={checkRoles(user.role)} />;
  }

  return <Outlet />;
}
