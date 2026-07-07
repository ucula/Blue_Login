import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const AddInfoRoutes: RouteObject[] = [
  {
    path: "/admin/add",
    element: <pages.admin.addUser.Main />,
  },
  {
    path: "/admin/add/send",
    element: <pages.admin.addUser.Send />,
  },
  {
    path: "/admin/add/verify",
    element: <pages.admin.addUser.Verify />,
  },
  {
    path: "/user/add/pass",
    element: <pages.admin.addUser.Pass />,
  },
];
