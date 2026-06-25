import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const protectedRoutes: RouteObject[] = [
  {
    element: <pages.ProtectedRoute />,
    children: [
      {
        path: "/brief",
        element: <pages.user.Home />,
      },
      {
        path: "/info/:id",
        element: <pages.user.AllInfo />,
      },
      {
        path: "/add",
        element: <pages.user.AddUser />,
      },
      {
        path: "/info/:id/edit",
        element: <pages.user.EditUser />,
      },
    ],
  },
];
