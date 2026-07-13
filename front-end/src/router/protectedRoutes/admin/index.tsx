import type { RouteObject } from "react-router-dom";
import pages from "@/pages";
import { PATHS } from "@/constants";

export const adminRouter: RouteObject[] = [
  {
    path: PATHS.ADMIN_HOME,
    element: <pages.admin.Home />,
  },
  {
    path: PATHS.ADMIN_USER_INFO.route,
    element: <pages.admin.AllInfo />,
  },
  {
    path: PATHS.ADMIN_ADD,
    element: <pages.admin.addUser.Main />,
  },
  {
    path: PATHS.ADD_VERIFY,
    element: <pages.admin.addUser.Verify />,
  },
  {
    path: PATHS.USER_PASS,
    element: <pages.admin.addUser.Pass />,
  },
];
