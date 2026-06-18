import { Request, Response } from "express";
import service from "../../../services/user/index";

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { email, type } = req.body;
    const response = await service.auth.verifyEmail(email, type);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
