import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";

export function verifyToken(authorization: any) {
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError(HttpResponseCode.UNAUTHORIZED, "No token in headers");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload)
      throw new AppError(HttpResponseCode.UNAUTHORIZED, "Invalid Token");
    return payload;
  } catch (err) {
    if (err instanceof AppError) {
      return err;
    }
  }
}
