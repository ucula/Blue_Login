import service from "@/services";
import { Navigate, Outlet } from "react-router-dom";

export function AdminGuard() {
  const id = localStorage.getItem("hotdog");

  if (!id) {
    localStorage.removeItem("hotdog");
    return <Navigate to="/" />;
  }

  const { data: user } = service.user.fetchUserById(id);

  if (user?.role === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/user" />;
}
