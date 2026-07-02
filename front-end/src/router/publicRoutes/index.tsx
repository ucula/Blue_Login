import type { RouteObject } from "react-router-dom";
import { loginRoutes } from "./login";
import { signupRoutes } from "./signup";
import { resetRoutes } from "./reset";

export const publicRoutes: RouteObject[] = [
  ...loginRoutes,
  ...signupRoutes,
  ...resetRoutes,
];
