import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
