import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const resetRoutes: RouteObject[] = [
  { path: "/reset", element: <pages.auth.reset.Main /> },
  { path: "/reset/email-sent", element: <pages.auth.reset.Send /> },
  { path: "/reset/verify", element: <pages.auth.reset.Verify /> },
  { path: "/reset/password", element: <pages.auth.reset.Pass /> },
];
