import { Request, Response } from "express";
import service from "@/services/user/index";

export async function verifyValue(req: Request, res: Response) {
  try {
    const { key, value, label } = req.body;
    const response = await service.auth.verifyValue(key, value, label);
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
