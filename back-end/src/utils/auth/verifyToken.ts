import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";

export function verifyToken(authorization: string): string | jwt.JwtPayload {
  const token = authorization.split(" ")[1];
  return jwt.verify(token, JWT_SECRET);
}
