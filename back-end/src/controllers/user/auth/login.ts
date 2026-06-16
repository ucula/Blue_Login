import { Request, Response } from "express";
import service from "../../../services/user/index";

export async function login(req: Request, res: Response) {
  try {
    await service.login(req.body);
    res.status(204).send();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
