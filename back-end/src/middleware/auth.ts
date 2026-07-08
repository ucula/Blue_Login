import { Request, Response, NextFunction } from "express";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { verifyToken } from "@/utils/auth/verifyToken";

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(HttpResponseCode.UNAUTHORIZED)
        .json({ message: "No token in headers" });
    }
    verifyToken(authorization);
    next();
  } catch {
    return res
      .status(HttpResponseCode.UNAUTHORIZED)
      .json({ message: "Token not match" });
  }
}

