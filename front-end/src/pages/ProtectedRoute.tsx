import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = localStorage.getItem("_session_state_id");

  if (!token) {
    localStorage.removeItem("_session_state_id");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
