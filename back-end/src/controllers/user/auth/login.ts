import { Request, Response } from "express";
import service from "@/services/user/index";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";

export async function login(req: Request, res: Response) {
  try {
    const dbUser = await service.auth.login(req.body);
    const token = jwt.sign({ Id: dbUser?._id }, JWT_SECRET, {
      expiresIn: "10m",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
