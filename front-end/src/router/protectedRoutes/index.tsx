import type { RouteObject } from "react-router-dom";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import { ProtectedRoute } from "./ProtectedRoute";

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: adminRouter,
  },
  {
    element: <ProtectedRoute />,
    children: userRouter,
  },
];
