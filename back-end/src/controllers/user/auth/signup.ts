import { Request, Response } from "express";
import service from "@/services/user/index";

export async function signup(req: Request, res: Response) {
  try {
    const response = await service.auth.signup(req.body);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
