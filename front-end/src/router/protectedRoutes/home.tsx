import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const homeRoutes: RouteObject[] = [
  {
    path: "/admin/home",
    element: <pages.user.Home />,
  },
];
