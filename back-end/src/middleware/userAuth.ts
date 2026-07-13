import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utility/auth/verifyToken";
import { Payload } from "@/utility/express/response";
import { AppError } from "@/utility/express/error";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export function userAuth(req: any, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    const payload: any = verifyToken(authorization);
    if (!payload || payload instanceof Error) {
      throw new AppError(HttpResponseCode.UNAUTHORIZED, "Invalid Token");
    }
    req.user = payload;
    next();
  } catch (err: any) {
    res.status(err.code || 401).json(new Payload(err));
  }
}
