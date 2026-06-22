import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/index";
import jwt from "jsonwebtoken";
import { HttpResponseCode } from "@/types/httpResponseCode";

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in env");
  }

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(HttpResponseCode.UNAUTHORIZED)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res
      .status(HttpResponseCode.UNAUTHORIZED)
      .json({ message: "Invalid or expired token." });
  }
}
