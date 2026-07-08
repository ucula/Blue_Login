import type { RouteObject } from "react-router-dom";
import { loginRoutes } from "./login";
import { signupRoutes } from "./signup";
import { resetRoutes } from "./reset";
import { LoginGuard } from "./loginGuard";

export const publicRoutes: RouteObject[] = [
  { element: <LoginGuard />, children: [...loginRoutes] },
  ...signupRoutes,
  ...resetRoutes,
];
