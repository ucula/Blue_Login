import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const AddInfoRoutes: RouteObject[] = [
  {
    path: "/admin/add",
    element: <pages.user.addUser.Main />,
  },
  {
    path: "/admin/add/send",
    element: <pages.user.addUser.Send />,
  },
  {
    path: "/admin/add/verify",
    element: <pages.user.addUser.Verify />,
  },
  {
    path: "/user/add/pass",
    element: <pages.user.addUser.Pass />,
  },
];
