import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const EditInfoRoutes: RouteObject[] = [
  {
    path: "/admin/info/:id/edit",
    element: <pages.user.EditUser />,
  },
];
