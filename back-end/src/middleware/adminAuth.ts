import { Request, Response, NextFunction } from "express";
import repo from "../repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import requireAuth from "./auth";
import { verifyToken } from "@/utils/auth/verifyToken";

export default function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  requireAuth(req, res, async () => {
    try {
      const { authorization } = req.headers;
      const decoded = verifyToken(authorization!) as { id: string };

      const user = await repo.user.getById(decoded.id);
      if (!user) {
        return res
          .status(HttpResponseCode.UNAUTHORIZED)
          .json({ message: "User not found" });
      }

      if (user.role !== "admin") {
        return res
          .status(HttpResponseCode.FORBIDDEN)
          .json({ message: "Forbidden: Admin role required" });
      }

      next();
    } catch (error) {
      return res
        .status(HttpResponseCode.UNAUTHORIZED)
        .json({ message: "Token not match" });
    }
  });
}

