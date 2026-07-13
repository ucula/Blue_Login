import type { RouteObject } from "react-router-dom";
import pages from "@/pages";
import { PATHS } from "@/constants";

export const userRouter: RouteObject[] = [
  {
    path: PATHS.USER_HOME,
    element: <pages.user.Home />,
  },
];
