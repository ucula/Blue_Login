import type { RouteObject } from "react-router-dom";
import {
  Login,
  ResetEmail,
  ResetPass,
  Signup,
  EmailSent,
  SignupVerify,
  ResetSend,
  ResetVerify,
} from "@/pages";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reset/email",
    element: <ResetEmail />,
  },
  {
    path: "/reset/email-sent",
    element: <ResetSend />,
  },
  {
    path: "/reset/verify",
    element: <ResetVerify />,
  },
  {
    path: "/reset/pass",
    element: <ResetPass />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup/email-sent",
    element: <EmailSent />,
  },
  {
    path: "/signup/verify",
    element: <SignupVerify />,
  },
];
