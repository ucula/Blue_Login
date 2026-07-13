import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      ...publicRoutes,
      ...protectedRoutes,
    ],
  },
]);
