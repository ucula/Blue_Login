import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  const isTokenExpired = (t: string) => {
    try {
      const payload = JSON.parse(atob(t.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    if (token) localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
