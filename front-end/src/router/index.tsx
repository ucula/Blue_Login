import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRouter";
import { protectedRoutes } from "./protectedRouter";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);
