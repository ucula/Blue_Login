import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "@/utility/verifyToken";
import { TOKEN_NAME } from "@/config";

export function AdminGuard() {
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) return <Navigate to="/login" />;
  const { data: user, isPending, isError } = verifyToken(token);
  if (isPending) {
    return null;
  }
  if (user?.role === "admin") {
    return <Outlet />;
  }

  if (isError || !user) {
    localStorage.removeItem(TOKEN_NAME);
    return <Navigate to="/login" />;
  }

  return <Navigate to="/user" />;
}
