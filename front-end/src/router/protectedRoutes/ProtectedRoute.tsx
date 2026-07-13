import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyToken } from "@/utility/verifyToken";
import { TOKEN_NAME } from "@/config";
import { PATHS } from "@/constants";

export function ProtectedRoute() {
  const token = localStorage.getItem(TOKEN_NAME);
  const location = useLocation();

  if (!token) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  const { data: user, isPending, isError } = verifyToken(token);
  if (isPending) {
    return null;
  }

  if (isError || !user) {
    localStorage.removeItem(TOKEN_NAME);
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  const role = user.role;

  if (role === "admin") {
    // Check if the current route is one of the admin paths to prevent an endless loop
    const isAdminPath =
      location.pathname.startsWith("/admin") ||
      location.pathname === PATHS.USER_HOME;

    if (!isAdminPath) {
      return <Navigate to={PATHS.ADMIN_HOME} replace />;
    }
  } else if (role === "user") {
    // Check if the current route is the user path to prevent an endless loop
    const isUserPath = location.pathname.startsWith("/user");

    if (!isUserPath) {
      return <Navigate to={PATHS.USER_HOME} replace />;
    }
  } else {
    // Throw a 404 response to delegate rendering to the ErrorBoundary
    throw new Response("Not Found", { status: 404 });
  }

  return <Outlet />;
}
