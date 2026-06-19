import { Request, Response } from "express";
import service from "@/services/user/index";

export async function verifyValue(req: Request, res: Response) {
  try {
    const { key, val } = req.body;
    const response = await service.auth.verifyValue(key, val);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
