import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/index";
import jwt from "jsonwebtoken";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

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
    const token = authorization.split(" ")[1];
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res
      .status(HttpResponseCode.UNAUTHORIZED)
      .json({ message: "Token not match" });
  }
}
