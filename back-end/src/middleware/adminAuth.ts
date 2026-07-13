import { Request, Response, NextFunction } from "express";
import { checkRoles } from "@/utility/auth/checkRoles";
import { Payload } from "@/utility/express/response";
import { verifyToken } from "@/utility/auth/verifyToken";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    const payload = verifyToken(authorization);
    // console.log("Token verified");
    checkRoles(payload, "admin");
    // console.log("Auth success!");
    next();
  } catch (err: any) {
    res.status(err.code).json(new Payload(err));
  }
}
