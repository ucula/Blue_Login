import service from "../../services/user/index";
import { Request, Response } from "express";

export async function checkDupe(req: Request, res: Response) {
  try {
    const data = await service.getDupe(req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Network error" });
  }
}
