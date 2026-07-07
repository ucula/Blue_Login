import type { RouteObject } from "react-router-dom";
import { homeRoutes } from "./home";
import { AllInfoRoutes } from "./allInfo";
import { AddInfoRoutes } from "./addInfo";
import { AdminGuard } from "./adminGuard";

export const adminRouter: RouteObject[] = [
  {
    element: <AdminGuard />,
    children: [...homeRoutes, ...AllInfoRoutes, ...AddInfoRoutes],
  },
];
