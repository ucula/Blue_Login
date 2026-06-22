import { Request, Response } from "express";
import service from "@/services/user/index";

export async function login(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.login(email, pass);
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
