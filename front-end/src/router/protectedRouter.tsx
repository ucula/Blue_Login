import type { RouteObject } from "react-router-dom";
import { ProtectedRoute, Home, AllInfo, AddUser, EditUser } from "@/pages";

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/brief",
        element: <Home />,
      },
      {
        path: "/info/:id",
        element: <AllInfo />,
      },
      {
        path: "/add",
        element: <AddUser />,
      },
      {
        path: "/info/:id/edit",
        element: <EditUser />,
      },
    ],
  },
];
