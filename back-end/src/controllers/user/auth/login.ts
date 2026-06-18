import { Request, Response } from "express";
import service from "../../../services/user/index";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config";

export async function login(req: Request, res: Response) {
  try {
    const dbUser = await service.login(req.body);
    const token = jwt.sign({ Id: dbUser?._id }, JWT_SECRET, {
      expiresIn: "3s",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
