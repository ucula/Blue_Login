import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <pages.auth.login.Main />,
  },
  {
    path: "/reset/email",
    element: <pages.auth.reset.Main />,
  },
  {
    path: "/reset/email-sent",
    element: <pages.auth.reset.Send />,
  },
  {
    path: "/reset/verify",
    element: <pages.auth.reset.Verify />,
  },
  {
    path: "/reset/pass",
    element: <pages.auth.reset.Pass />,
  },
  {
    path: "/signup",
    element: <pages.auth.signup.Main />,
  },
  {
    path: "/signup/email-sent",
    element: <pages.auth.signup.Send />,
  },
  {
    path: "/signup/verify",
    element: <pages.auth.signup.Verify />,
  },
];
