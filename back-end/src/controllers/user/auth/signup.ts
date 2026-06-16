import { Request, Response } from "express";
import service from "../../../services/user/index";

export async function signup(req: Request, res: Response) {
  try {
    await service.signup(req.body);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
