import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const AllInfoRoutes: RouteObject[] = [
  {
    path: "/admin/user/info/:id",
    element: <pages.admin.AllInfo />,
  },
];
