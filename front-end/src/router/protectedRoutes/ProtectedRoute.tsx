import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = localStorage.getItem("bazooka");

  if (!token) {
    localStorage.removeItem("bazooka");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
