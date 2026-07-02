import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import pages from "@/pages";

export const loginRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <pages.auth.login.Main /> },
];
