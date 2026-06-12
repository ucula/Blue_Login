import service from "../../services/user/index";
import { Request, Response } from "express";

export async function checkEmail(req: Request, res: Response) {
  try {
    const { email, isDupe } = req.body;
    const data = await service.getEmail(email, isDupe);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Network error" });
  }
}
