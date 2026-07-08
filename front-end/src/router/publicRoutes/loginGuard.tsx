import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "@/utility/verifyToken";
import { TOKEN_NAME } from "@/config";

export function LoginGuard() {
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) return <Outlet />;
  const { data: user, isPending, isError } = verifyToken(token);
  if (isPending) {
    return null;
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/home" />;
    }
    if (user.role === "user") {
      return <Navigate to="/user" />;
    }
  }

  if (isError || !user) {
    localStorage.removeItem(TOKEN_NAME);
    return <Outlet />;
  }

  return <Outlet />;
}
