import type { RouteObject } from "react-router-dom";
import pages from "@/pages";

export const signupRoutes: RouteObject[] = [
  { path: "/signup", element: <pages.auth.signup.Main /> },
  { path: "/signup/email-sent", element: <pages.auth.signup.Send /> },
  { path: "/signup/verify", element: <pages.auth.signup.Verify /> },
];
