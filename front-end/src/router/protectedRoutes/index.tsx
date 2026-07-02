import type { RouteObject } from "react-router-dom";
import pages from "@/pages";
import { homeRoutes } from "./home";
import { AllInfoRoutes } from "./allInfo";
import { AddInfoRoutes } from "./addInfo";
import { EditInfoRoutes } from "./editInfo";

export const protectedRoutes: RouteObject[] = [
  {
    element: <pages.ProtectedRoute />,
    children: [
      ...homeRoutes,
      ...AllInfoRoutes,
      ...AddInfoRoutes,
      ...EditInfoRoutes,
    ],
  },
];
