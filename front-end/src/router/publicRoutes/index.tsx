import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import pages from "@/pages";
import { PATHS } from "@/constants";
import { LoginGuard } from "./loginGuard";

export const publicRoutes: RouteObject[] = [
  {
    element: <LoginGuard />,
    children: [
      { path: PATHS.ROOT, element: <Navigate to={PATHS.LOGIN} replace /> },
      { path: PATHS.LOGIN, element: <pages.auth.login.Main /> },
    ],
  },
  { path: PATHS.SIGNUP, element: <pages.auth.signup.Main /> },
  { path: PATHS.SIGNUP_VERIFY, element: <pages.auth.signup.Verify /> },
  { path: PATHS.RESET, element: <pages.auth.reset.Main /> },
  { path: PATHS.RESET_VERIFY, element: <pages.auth.reset.Verify /> },
  { path: PATHS.RESET_PASSWORD, element: <pages.auth.reset.Pass /> },
];
