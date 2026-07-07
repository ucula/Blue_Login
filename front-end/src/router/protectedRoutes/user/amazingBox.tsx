import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const amazingBoxRouter: RouteObject[] = [
  {
    path: "/user",
    element: <pages.user.Home />,
  },
];
